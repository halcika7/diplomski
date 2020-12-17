import { FileService } from '@service/File';
import { OrderRepository } from '@repository/Order';
import { BaseService } from './Base';
import { Injectable } from '@decorator/class';
import { CartRepository } from '@repository/Cart';
import { Types, Aggregate } from 'mongoose';
import { OrderInterface } from '@model/Order/Order';
import { UserRepository } from '@repository/User';
import { EmailService } from './Email';
import {
  OrderAggregate,
  Token,
  OrderFor,
  OrderType,
  UserRole,
  HTTPCodes,
} from '@job/common';

const { ObjectId } = Types;

@Injectable()
export class OrderService extends BaseService {
  // eslint-disable-next-line max-params
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly orderRepository: OrderRepository,
    private readonly fileService: FileService,
    private readonly userRepository: UserRepository,
    private readonly emailService: EmailService
  ) {
    super();
  }

  private getEmails(role: UserRole, id?: string) {
    return this.userRepository
      .getEmails(role, id)
      .then(users => users.map(user => user.email));
  }

  private getOrderedBy(order: OrderInterface) {
    return typeof order?.orderedBy === 'string'
      ? order?.orderedBy
      : order?.orderedBy._id;
  }

  async makeOrder(userId: string, orderedFor: OrderFor) {
    const cart = await this.cartRepository.findById(userId);
    const documents = cart!.documents.map(doc => doc);
    const valid = ['Personal', 'University'];

    if (!valid.includes(orderedFor)) {
      this.returnResponse(HTTPCodes.BAD_REQUEST, {
        errors: { useFor: 'Use for is not valid' },
      });
    }

    this.fileService.addFilesToDB(cart!.documents, userId);

    const total = cart!.totalCost;

    const order = await this.orderRepository
      .createOrder({
        documents,
        totalCost: total,
        orderedBy: userId,
        orderedFor,
        status: orderedFor === 'University' ? 'pending' : 'approved',
      })
      .save();

    const role = orderedFor === 'Personal' ? 'worker' : 'administration';

    const emails = await this.getEmails(role);

    await this.emailService.sendEmail({
      emails,
      orderId: order._id,
      type: orderedFor,
    });

    cart!.documents = [];
    cart!.totalCost = 0;
    await cart?.save();

    return this.returnResponse(HTTPCodes.OK, {
      cart: { documents: cart?.documents, totalCost: cart?.totalCost },
      message: 'Order successful',
    });
  }

  getOrders(user: Token, orderType: string): Aggregate<OrderAggregate[]> {
    const validStatus = [
      'completed',
      'pending',
      'rejected',
      'approved',
      'finished',
    ];
    const paid = null;
    const status = validStatus.includes(orderType) ? orderType : null;

    const matchParam = {
      orderedBy: user.role === 'professor' ? new ObjectId(user.id) : null,
      orderedFor: user.role === 'administration' ? user.role : null,
      status,
      paid,
    };

    return this.orderRepository.getOrders(matchParam);
  }

  async getOrder(user: Token, orderId: string) {
    const order = await this.orderRepository.getOrder(orderId);

    if (!order) {
      return this.returnResponseMessage(
        HTTPCodes.BAD_REQUEST,
        'Order was not found'
      );
    }

    const orderedById = this.getOrderedBy(order);
    const { orderedFor } = order;

    if (user.role === 'professor' && orderedById.toString() !== user.id) {
      return this.returnResponseMessage(
        HTTPCodes.BAD_REQUEST,
        'This order is not ordered by you'
      );
    }

    if (user.role === 'administration' && orderedFor !== 'University') {
      return this.returnResponseMessage(
        HTTPCodes.BAD_REQUEST,
        'This order is not ordered for University purposes'
      );
    }

    return this.returnResponse(HTTPCodes.OK, { order });
  }

  private validateOrderStatus(order: OrderInterface, status: OrderType) {
    if (
      ((status === 'finished' || status === 'rejected') &&
        order.status !== 'approved') ||
      (status === 'approved' && order.status !== 'pending') ||
      (status === 'completed' && order.status !== 'finished')
    ) {
      return 'Status not valid';
    }
    if (order.status === status) {
      return `Order already has status -> ${
        status.charAt(0).toUpperCase() + status.slice(1)
      }`;
    }
    return '';
  }

  async updateOrderStatus(
    id: string,
    status: OrderType,
    role: UserRole,
    rejectedBy?: string
  ) {
    const order = await this.orderRepository.getOrder(id);

    if (!order) {
      return this.returnResponseMessage(
        HTTPCodes.BAD_REQUEST,
        'Order was not found'
      );
    }

    const message = this.validateOrderStatus(order, status);

    if (message) {
      return this.returnResponseMessage(HTTPCodes.BAD_REQUEST, message);
    }

    order.status = status;

    const orderedById = this.getOrderedBy(order);

    const userId =
      status === 'finished' || status === 'rejected' ? orderedById : '';

    const rejected = status === 'rejected' ? rejectedBy : '';

    const emails = await this.getEmails(role, userId);

    if (status !== 'completed') {
      await Promise.all([
        order.save(),
        this.emailService.sendEmail({
          emails,
          orderId: order._id,
          type: status,
          rejected,
        }),
      ]);
    } else {
      await order.save();
    }

    return this.returnResponse(HTTPCodes.OK, { message: `Order ${status}` });
  }
}
