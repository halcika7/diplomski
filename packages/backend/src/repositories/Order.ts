import Order from '@model/Order';
import { OrderInterface } from '@model/Order/Order';
import { BaseRepository } from './Base';
import { Injectable } from '@decorator/class';
import { Dictionary } from '../utils/genericTypes';

@Injectable()
export class OrderRepository extends BaseRepository {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  createOrder(data: Partial<OrderInterface>): OrderInterface {
    return super.createModelInstance<Dictionary, OrderInterface>(Order, data);
  }
}
