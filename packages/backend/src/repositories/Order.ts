import Order from '@model/Order';
import { OrderInterface } from '@model/Order/Order';
import { BaseRepository } from './Base';
import { Injectable } from '@decorator/class';
import { Types, Query } from 'mongoose';
import { months, FindByOrder } from '@ctypes';
import {
  OrderAggregate,
  OrderCostMonth,
  OrdersByMonths,
  AnyDictionary,
} from '@job/common';

const { ObjectId } = Types;

@Injectable()
export class OrderRepository extends BaseRepository {
  constructor() {
    super();
  }

  private removeNullFromObject(obj: FindByOrder) {
    const newObj = {} as FindByOrder;

    Object.entries(obj).forEach(([key, value]) => {
      if (value !== null) {
        newObj[`${key}`] = value;
      }
    });

    return newObj;
  }

  createOrder(data: Partial<OrderInterface>): OrderInterface {
    return super.createModelInstance<AnyDictionary, OrderInterface>(
      Order,
      data
    );
  }

  getOrders(findBy: FindByOrder) {
    const validFindBy = this.removeNullFromObject(findBy);

    return Order.aggregate<OrderAggregate>([
      { $match: { ...validFindBy } },
      { $sort: { createdAt: -1 } },
      {
        $project: {
          _id: 1,
          totalCost: 1,
          orderedFor: 1,
          status: 1,
          createdAt: 1,
          month: { $month: '$createdAt' },
          year: { $year: '$createdAt' },
        },
      },
    ]);
  }

  getOrder(id: string): Query<OrderInterface | null, OrderInterface> {
    return Order.findOne({ _id: new ObjectId(id) }).populate(
      'orderedBy',
      'name'
    );
  }

  async getOrdersForEarnings(findBy: FindByOrder) {
    const Orders = await this.getOrders(findBy);
    const completed = Orders.filter(
      (order: OrderAggregate) => order.status === 'completed'
    );
    const notPaid = Orders.filter(
      (order: OrderAggregate) => order.status === 'finished'
    );

    return { Orders, completed, notPaid };
  }

  async getTotalCostByMonths(findBy: FindByOrder, year: number) {
    const validFindBy = this.removeNullFromObject(findBy);
    const data = {
      group: {
        _id: { x: '$month', monthNumber: '$monthNumber' },
        y: { $sum: '$totalCost' },
      },
      addFields: {
        x: {
          $let: {
            vars: { monthsInString: months },
            in: { $arrayElemAt: ['$$monthsInString', '$_id.x'] },
          },
        },
        monthNumber: '$_id.monthNumber',
      },
      project: { _id: 0, x: 1, y: 1, monthNumber: 1 },
    };

    return Order.aggregate<OrderCostMonth>([
      { $match: { ...validFindBy } },
      {
        $project: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
          monthNumber: { $month: '$createdAt' },
          totalCost: 1,
        },
      },
      { $match: { year } },
      { $group: { ...data.group } },
      { $addFields: { ...data.addFields } },
      { $project: { ...data.project } },
      { $sort: { monthNumber: 1 } },
    ]);
  }

  async getTotalOrdersForMonth(
    option: string | number,
    findBy: FindByOrder,
    date: { year: number; month: number }
  ) {
    const validFindBy = this.removeNullFromObject(findBy);
    const daysInMonth = new Date(date.year, date.month, 0).getDate();
    const newOrders = await Order.aggregate<{ x: number; y: number }>([
      { $match: { ...validFindBy } },
      {
        $project: {
          month: { $month: '$createdAt' },
          year: { $year: '$createdAt' },
          totalCost: 1,
          createdAt: 1,
        },
      },
      { $match: { ...date } },
      {
        $group: {
          _id: { monthDay: { $dayOfMonth: '$createdAt' } },
          y: { $sum: option },
        },
      },
      { $sort: { '_id.monthDay': 1, '_id.day': 1 } },
      { $project: { _id: 0, x: '$_id.monthDay', y: 1 } },
    ]);

    const orders = [];

    for (let i = 1; i <= daysInMonth; i += 1) {
      const find = newOrders.find(order => order.x === i);
      if (find) {
        orders.push(find);
      } else {
        orders.push({ y: 0, x: i });
      }
    }

    return orders;
  }

  allMonths(orders: OrderCostMonth[] | OrdersByMonths[], line = true) {
    const allMonthsEarning = [];
    for (let i = 1; i < months.length; i += 1) {
      const findIndex = orders.findIndex(
        (order: OrderCostMonth | OrdersByMonths) => order.monthNumber === i
      );
      if (findIndex === -1 && line) {
        allMonthsEarning.push({ x: months[i], y: 0, monthNumber: i });
      } else if (findIndex === -1 && !line) {
        allMonthsEarning.push({
          month: months[i],
          'Total Earnings': 0,
          'Number of Orders': 0,
          monthNumber: i,
        });
      } else allMonthsEarning.push(orders[findIndex]);
    }

    return allMonthsEarning;
  }

  async getNumberOfOrdersByMonths(year: number, findBy: FindByOrder = {}) {
    const validFindBy = this.removeNullFromObject(findBy);
    const data = {
      group: {
        _id: { month: '$month', monthNumber: '$monthNumber' },
        'Number of Orders': { $sum: 1 },
      },
      addFields: {
        month: {
          $let: {
            vars: { monthsInString: months },
            in: { $arrayElemAt: ['$$monthsInString', '$_id.month'] },
          },
        },
        monthNumber: '$_id.monthNumber',
      },
      project: { _id: 0, month: 1, 'Number of Orders': 1, monthNumber: 1 },
    };

    return Order.aggregate<OrdersByMonths>([
      { $match: { ...validFindBy } },
      {
        $project: {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
          monthNumber: { $month: '$createdAt' },
          totalCost: 1,
        },
      },
      { $match: { year } },
      { $group: { ...data.group } },
      { $addFields: { ...data.addFields } },
      { $project: { ...data.project } },
      { $sort: { monthNumber: 1 } },
    ]);
  }
}
