import { BaseService } from './Base';
import { Injectable } from '@decorator/class';
import { OrderRepository } from '@repository/Order';
import { Types } from 'mongoose';
import { ChartHelper, FindByOrder } from '@ctypes';
import {
  DateHelper,
  NumberHelper,
  OrderAggregate,
  CB,
  Token,
  OrderFor,
} from '@job/common';

const { ObjectId } = Types;

const EmptyFn = () => true;

@Injectable()
export class DashboardService extends BaseService {
  private dateHelper: DateHelper;

  private numberHelper: NumberHelper;

  constructor(private readonly orderRepository: OrderRepository) {
    super();
    this.dateHelper = new DateHelper();
    this.numberHelper = new NumberHelper();
  }

  private cbOrderedFor(orderedFor: OrderFor) {
    return (order: OrderAggregate) => order.orderedFor === orderedFor;
  }

  private forPersonal() {
    return this.cbOrderedFor('Personal');
  }

  private forUniversity() {
    return this.cbOrderedFor('University');
  }

  private cbRejected(order: OrderAggregate) {
    return order.status === 'rejected';
  }

  private getSum(orders: OrderAggregate[], cb: CB = EmptyFn) {
    let total: number | string = orders
      .filter(cb)
      .reduce((a, b) => a + b.totalCost, 0);

    total = this.numberHelper.getTwoDigitNumber(total);

    return parseFloat(total);
  }

  private getOrderCount(orders: OrderAggregate[], cb: CB = EmptyFn) {
    return orders.filter(cb).length;
  }

  private async getOrdersCommon(findBy: FindByOrder = {}) {
    const {
      Orders,
      completed,
      notPaid,
    } = await this.orderRepository.getOrdersForEarnings(findBy);
    const cFalse: [OrderAggregate[], boolean] = [completed, false];
    const oFalse: [OrderAggregate[], boolean] = [Orders, false];

    return {
      Orders,
      completed,
      notPaid,
      total: this.getSum(completed),
      totalDebt: this.getSum(notPaid),
      orders: Orders.length,
      completedOrders: completed.length,
      rejectedOrders: this.getOrderCount(Orders, this.cbRejected),
      unpaid: notPaid.length,
      monthEarnings: this.getMonthEarningsOrders(completed),
      monthDebt: this.getMonthEarningsOrders(completed),
      monthOrders: this.getMonthEarningsOrders(...oFalse),
      monthCompletedOrders: this.getMonthEarningsOrders(...cFalse),
      monthRejectedOrders: this.getMonthEarningsOrders(
        ...oFalse,
        this.cbRejected
      ),
      monthUnpaidOrders: this.getMonthEarningsOrders(...cFalse),
    };
  }

  private getOrdersAdminProfessor(
    Orders: OrderAggregate[],
    completed: OrderAggregate[],
    notPaid: OrderAggregate[]
  ) {
    const cbU = this.forUniversity();
    const cbP = this.forPersonal();
    const cFalse: [OrderAggregate[], boolean] = [completed, false];
    const cTrue: [OrderAggregate[], boolean] = [completed, true];
    const oFalse: [OrderAggregate[], boolean] = [Orders, false];

    const cFalseU: [OrderAggregate[], boolean, CB] = [...cFalse, cbU];
    const cFalseP: [OrderAggregate[], boolean, CB] = [...cFalse, cbP];

    const cTrueU: [OrderAggregate[], boolean, CB] = [...cTrue, cbU];
    const cTrueP: [OrderAggregate[], boolean, CB] = [...cTrue, cbP];
    return {
      user: this.getSum(completed, this.forPersonal()),
      university: this.getSum(completed, this.forUniversity()),
      userDebt: this.getSum(notPaid, this.forPersonal()),
      universityDebt: this.getSum(notPaid, this.forUniversity()),
      usersOrders: this.getOrderCount(Orders, this.forPersonal()),
      universityOrders: this.getOrderCount(Orders, this.forUniversity()),
      completedUser: this.getOrderCount(completed, this.forPersonal()),
      completedUniversity: this.getOrderCount(completed, this.forUniversity()),
      unpaidUser: this.getOrderCount(notPaid, this.forPersonal()),
      monthEarningsUser: this.getMonthEarningsOrders(...cTrueP),
      monthEarningsUniversity: this.getMonthEarningsOrders(...cTrueU),
      monthDebtUser: this.getMonthEarningsOrders(...cTrueP),
      monthDebtUniversity: this.getMonthEarningsOrders(...cTrueU),
      monthOrdersUser: this.getMonthEarningsOrders(...oFalse, cbP),
      monthOrdersUniversity: this.getMonthEarningsOrders(...oFalse, cbU),
      monthCompletedOrdersUser: this.getMonthEarningsOrders(...cFalseP),
      monthCompletedOrdersUniversity: this.getMonthEarningsOrders(...cFalseU),
      monthUnpaidOrdersUser: this.getMonthEarningsOrders(...cFalseP),
      monthUnpaidOrdersUniversity: this.getMonthEarningsOrders(...cFalseU),
    };
  }

  private getMonthEarningsOrders(
    orders: OrderAggregate[],
    sum = true,
    cb: CB = EmptyFn
  ) {
    const thisMonth = this.dateHelper.getCurrentMonth;
    const Orders = orders.filter(cb);
    const fn = (num = 0) => (order: OrderAggregate) =>
      order.month === thisMonth - num;
    const params1: [OrderAggregate[], CB] = [Orders, fn()];
    const params2: [OrderAggregate[], CB] = [Orders, fn(-1)];

    if (sum) {
      return {
        thisMonthEarnings: this.getSum(...params1),
        lastMonthEarnings: this.getSum(...params2),
      };
    }

    return {
      thisMonthOrders: this.getOrderCount(...params1),
      lastMonthOrders: this.getOrderCount(...params2),
    };
  }

  private get dateObj() {
    return {
      month: this.dateHelper.getCurrentMonth,
      year: this.dateHelper.getCurrentYear,
    };
  }

  async chartHelper({ findBy = {}, Data, user, year = 0 }: ChartHelper) {
    const obj = { ...findBy };

    if (user?.role === 'professor') {
      obj.orderedBy = new Types.ObjectId(user.id);
    }

    if (Data) {
      return this.orderRepository.getTotalOrdersForMonth(
        Data.type,
        obj,
        Data.date
      );
    }

    const data = await this.orderRepository.getTotalCostByMonths(obj, year);

    return this.orderRepository.allMonths(data);
  }

  async getNumberOfOrdersByMonths(
    year: number,
    findBy: FindByOrder = {},
    user?: Token
  ) {
    const obj = { ...findBy };

    if (user?.role === 'professor') {
      obj.orderedBy = new Types.ObjectId(user.id);
    }

    const orders = await this.orderRepository.getNumberOfOrdersByMonths(
      year,
      obj
    );

    return this.orderRepository.allMonths(orders, false);
  }

  async getEarningsAdmin() {
    const date = this.dateObj;
    const [
      earningsByMonth,
      earningsForMonth,
      ordersByMonths,
      ordersByMonth,
    ] = await Promise.all([
      this.chartHelper({ year: this.dateHelper.getCurrentYear }),
      this.chartHelper({ Data: { type: '$totalCost', date } }),
      this.getNumberOfOrdersByMonths(this.dateHelper.getCurrentYear),
      this.chartHelper({ Data: { type: 1, date } }),
    ]);
    const {
      Orders,
      completed,
      notPaid,
      ...common
    } = await this.getOrdersCommon();
    const rest = this.getOrdersAdminProfessor(Orders, completed, notPaid);

    return {
      ...rest,
      ...common,
      unpaidUniversity: this.getOrderCount(notPaid, this.forUniversity()),
      earningsByMonth,
      earningsForMonth,
      ordersByMonths,
      ordersByMonth,
    };
  }

  async getEarningsProfessor(user: Token) {
    const date = this.dateObj;
    const {
      Orders,
      completed,
      notPaid,
      ...common
    } = await this.getOrdersCommon({ orderedBy: new ObjectId(user.id) });
    const [
      earningsByMonth,
      earningsForMonth,
      ordersByMonths,
      ordersByMonth,
    ] = await Promise.all([
      this.chartHelper({ user, year: this.dateHelper.getCurrentYear }),
      this.chartHelper({ user, Data: { type: '$totalCost', date } }),
      this.getNumberOfOrdersByMonths(this.dateHelper.getCurrentYear, {}, user),
      this.chartHelper({ user, Data: { type: 1, date } }),
    ]);
    const rest = this.getOrdersAdminProfessor(Orders, completed, notPaid);

    return {
      ...rest,
      ...common,
      earningsByMonth,
      earningsForMonth,
      ordersByMonths,
      ordersByMonth,
    };
  }

  async getEarningsAdministration() {
    const date = this.dateObj;
    const findBy = { orderedFor: 'University' };
    const [
      earningsByMonth,
      earningsForMonth,
      ordersByMonths,
      ordersByMonth,
      data,
    ] = await Promise.all([
      this.chartHelper({ findBy, year: this.dateHelper.getCurrentYear }),
      this.chartHelper({ findBy, Data: { type: '$totalCost', date } }),
      this.getNumberOfOrdersByMonths(this.dateHelper.getCurrentYear, findBy),
      this.chartHelper({ findBy, Data: { type: 1, date } }),
      this.getOrdersCommon(findBy),
    ]);
    return {
      earningsByMonth,
      earningsForMonth,
      ordersByMonths,
      ordersByMonth,
      ...data,
    };
  }
}
