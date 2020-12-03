import { FileService } from '@service/File';
import { OrderRepository } from '@repository/Order';
import { BaseService } from './Base';
import { Injectable } from '@decorator/class';
import { CartRepository } from '@repository/Cart';
import { Token } from '@ctypes';
import { Types, Aggregate } from 'mongoose';
import { OrderInterface } from '@model/Order/Order';

const { ObjectId } = Types;

@Injectable()
export class OrderService extends BaseService {
  constructor(
    private readonly cartRepository: CartRepository,
    private readonly orderRepository: OrderRepository,
    private readonly fileService: FileService
  ) {
    super();
  }

  async makeOrder(userId: string, orderedFor: string) {
    const cart = await this.cartRepository.findById(userId);
    const documents = cart!.documents.map(doc => doc);

    this.fileService.addFilesToDB(cart!.documents, userId);

    const total = cart!.totalCost;

    await this.orderRepository
      .createOrder({
        documents,
        totalCost: total,
        orderedBy: userId,
        orderedFor,
        status: orderedFor === 'University' ? 'pending' : 'approved',
        deleted: false,
        paid: false,
      })
      .save();

    cart!.documents = [];
    cart!.totalCost = 0;
    return cart!.save();
  }

  getOrders(user: Token, orderType: string): Aggregate<OrderInterface[]> {
    const validStatus = ['completed', 'pending', 'rejected', 'approved'];
    let paid = null;

    if (orderType === 'paid') {
      paid = true;
    } else if (orderType === 'unpaid') {
      paid = false;
    }

    const matchParam = {
      orderedBy: user.role === 'professor' ? new ObjectId(user.id) : null,
      orderedFor: user.role === 'administration' ? user.role : null,
      status: validStatus.includes(orderType) ? orderType : null,
      paid,
      deleted: orderType === 'deleted',
    };

    return this.orderRepository.getOrders(matchParam);
  }

  async getOrder(user: Token, orderId: string) {
    const order = await this.orderRepository.getOrder(orderId);

    if (!order) {
      return this.returnResponseMessage(400, 'Order was not found');
    }

    const orderedById =
      typeof order?.orderedBy === 'string'
        ? order?.orderedBy
        : order?.orderedBy._id;
    const orderedFor = order?.orderedFor;

    if (user.role === 'professor' && orderedById !== user.id) {
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
}
