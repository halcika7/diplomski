import { FileService } from '@service/File';
import { OrderRepository } from '@repository/Order';
import { BaseService } from './Base';
import { Injectable } from '@decorator/class';
import { CartRepository } from '@repository/Cart';
import { Token } from '@ctypes';
import { Types, Aggregate } from 'mongoose';
import { OrderInterface } from '@model/Order/Order';
import { UserRepository } from '@repository/User';
import { EmailService } from './Email';

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

  private getEmails(role: string, id?: string) {
    return this.userRepository
      .getEmails(role, id)
      .then(users => users.map(user => user.email));
  }

  private getOrderedBy(order: OrderInterface) {
    return typeof order?.orderedBy === 'string'
      ? order?.orderedBy
      : order?.orderedBy._id;
  }

  async makeOrder(userId: string, orderedFor: 'Personal' | 'University') {
    const cart = await this.cartRepository.findById(userId);
    const documents = cart!.documents.map(doc => doc);
    const valid = ['Personal', 'University'];

    if (!valid.includes(orderedFor)) {
      this.returnResponse(400, { errors: { useFor: 'Use for is not valid' } });
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
        paid: false,
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

    return this.returnResponse(200, {
      cart: { documents: cart?.documents, totalCost: cart?.totalCost },
      message: 'Order successful',
    });
  }

  getOrders(user: Token, orderType: string): Aggregate<OrderInterface[]> {
    const validStatus = ['completed', 'pending', 'rejected', 'approved'];
    let paid = null;
    let status = validStatus.includes(orderType) ? orderType : null;

    if (orderType === 'paid') {
      paid = true;
    } else if (orderType === 'unpaid') {
      paid = false;
    }

    if (orderType === 'paid' || orderType === 'unpaid') {
      status = 'finished';
    }

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
      return this.returnResponseMessage(400, 'Order was not found');
    }

    const orderedById = this.getOrderedBy(order);
    const { orderedFor } = order;

    if (user.role === 'professor' && orderedById.toString() !== user.id) {
      return this.returnResponseMessage(
        400,
        'This order is not ordered by you'
      );
    }

    if (user.role === 'administration' && orderedFor !== 'University') {
      return this.returnResponseMessage(
        400,
        'This order is not ordered for University purposes'
      );
    }

    return this.returnResponse(200, { order });
  }

  async updateOrderStatus(
    id: string,
    status: 'finished' | 'rejected' | 'approved',
    role: 'administration' | 'worker' | 'professor',
    rejectedBy?: string
  ) {
    const order = await this.orderRepository.getOrder(id);

    if (!order) {
      return this.returnResponseMessage(400, 'Order was not found');
    }

    order.status = status;

    const orderedById = this.getOrderedBy(order);

    const userId =
      status === 'finished' || status === 'rejected' ? orderedById : '';

    const rejected = status === 'rejected' ? rejectedBy : '';

    const emails = await this.getEmails(role, userId);

    await Promise.all([
      order.save(),
      this.emailService.sendEmail({
        emails,
        orderId: order._id,
        type: status,
        rejected,
      }),
    ]);

    return this.returnResponse(200, { message: `Order ${status}` });
  }

  async payOrder(id: string) {
    const order = await this.orderRepository.getOrderToPay(id);

    if (!order) {
      return this.returnResponse(404, { message: 'Order not found' });
    }

    order.paid = true;
    order.status = 'completed';
    await order.save();

    return this.returnResponse(200, { message: 'Order paid' });
  }
}
