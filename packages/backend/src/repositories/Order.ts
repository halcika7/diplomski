import Order from '@model/Order';
import { OrderInterface } from '@model/Order/Order';
import { BaseRepository } from './Base';
import { Injectable } from '@decorator/class';
import { Dictionary } from '../utils/genericTypes';
import { Types, Aggregate } from 'mongoose';

const { ObjectId } = Types;

type ValidValues = string | boolean | null | Types.ObjectId;

type FindBy = Record<string, ValidValues>;

@Injectable()
export class OrderRepository extends BaseRepository {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  private removeNullFromObject(obj: FindBy) {
    const newObj = {} as FindBy;

    Object.entries(obj).forEach(([key, value]) => {
      if (value !== null) {
        newObj[`${key}`] = value;
      }
    });

    return newObj;
  }

  createOrder(data: Partial<OrderInterface>): OrderInterface {
    return super.createModelInstance<Dictionary, OrderInterface>(Order, data);
  }

  getOrders(findBy: FindBy): Aggregate<OrderInterface[]> {
    const validFindBy = this.removeNullFromObject(findBy);

    return Order.aggregate([
      { $match: { ...validFindBy } },
      { $sort: { createdAt: -1 } },
      {
        $project: {
          _id: 1,
          totalCost: 1,
          orderedFor: 1,
          status: 1,
          paid: 1,
          deleted: 1,
          createdAt: 1,
        },
      },
    ]);
  }

  getOrder(orderId: string) {
    return Order.findOne({ _id: new ObjectId(orderId) }).populate(
      'orderedBy',
      'name'
    );
  }
}
