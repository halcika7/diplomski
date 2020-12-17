import Cart from '@model/Cart';
import { CartInterface } from '@model/Cart/Cart';
import { BaseRepository } from './Base';
import { Injectable } from '@decorator/class';
import { AnyDictionary } from '@job/common';
import { Types } from 'mongoose';

@Injectable()
export class CartRepository extends BaseRepository {
  constructor() {
    super();
  }

  createCart(data: Partial<CartInterface>): CartInterface {
    return super.createModelInstance<AnyDictionary, CartInterface>(Cart, data);
  }

  async findById(id: string) {
    return Cart.findOne({ userId: new Types.ObjectId(id) });
  }
}
