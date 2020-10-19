import Cart from '@model/Cart';
import { CartInterface } from '@model/Cart/Cart';
import { BaseRepository } from './Base';
import { Injectable } from '@decorator/class';
import { Dictionary } from '../utils/genericTypes';
import { Types } from 'mongoose';

@Injectable()
export class CartRepository extends BaseRepository {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  createCart(data: Partial<CartInterface>): CartInterface {
    return super.createModelInstance<Dictionary, CartInterface>(Cart, data);
  }

  async findById(id: string) {
    return Cart.findOne({ userId: new Types.ObjectId(id) });
  }
}
