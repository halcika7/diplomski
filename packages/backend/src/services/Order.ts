import { FileService } from '@service/File';
import { OrderRepository } from '@repository/Order';
import { BaseService } from './Base';
import { Injectable } from '@decorator/class';
import { CartRepository } from '@repository/Cart';

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
}
