import { DashboardActions, DashboardActionTypes } from '../types/dashboard';
import { OrdersByMonths, OrderCostMonth } from '@job/common';

type MonthEarning = {
  thisMonthEarnings: number;
  lastMonthEarnings: number;
};

type MonthOrder = {
  thisMonthOrders: number;
  lastMonthOrders: number;
};

export interface DashboardState {
  total: number | null;
  user: number | null;
  university: number | null;
  totalDebt: number | null;
  userDebt: number | null;
  universityDebt: number | null;
  orders: number | null;
  usersOrders: number | null;
  universityOrders: number | null;
  completedOrders: number | null;
  completedUser: number | null;
  completedUniversity: number | null;
  rejectedOrders: number | null;
  unpaid: number | null;
  unpaidUser: number | null;
  unpaidUniversity: number | null;
  monthEarnings: MonthEarning | null;
  monthEarningsUser: MonthEarning | null;
  monthEarningsUniversity: MonthEarning | null;
  monthDebt: MonthEarning | null;
  monthDebtUser: MonthEarning | null;
  monthDebtUniversity: MonthEarning | null;
  monthOrders: MonthOrder | null;
  monthOrdersUser: MonthOrder | null;
  monthOrdersUniversity: MonthOrder | null;
  monthCompletedOrders: MonthOrder | null;
  monthCompletedOrdersUser: MonthOrder | null;
  monthCompletedOrdersUniversity: MonthOrder | null;
  monthRejectedOrders: MonthOrder | null;
  monthUnpaidOrders: MonthOrder | null;
  monthUnpaidOrdersUser: MonthOrder | null;
  monthUnpaidOrdersUniversity: MonthOrder | null;
  earningsForMonth: OrderCostMonth[] | null;
  earningsByMonth: OrderCostMonth[] | null;
  ordersByMonths: OrdersByMonths[] | null;
  ordersByMonth: { x: number; y: number }[] | null;
}

export const INITIAL_STATE: DashboardState = {
  total: null,
  user: null,
  university: null,
  totalDebt: null,
  userDebt: null,
  universityDebt: null,
  orders: null,
  usersOrders: null,
  universityOrders: null,
  completedOrders: null,
  completedUser: null,
  completedUniversity: null,
  rejectedOrders: null,
  unpaid: null,
  unpaidUser: null,
  unpaidUniversity: null,
  monthEarnings: null,
  monthEarningsUser: null,
  monthEarningsUniversity: null,
  monthDebt: null,
  monthDebtUser: null,
  monthDebtUniversity: null,
  monthOrders: null,
  monthOrdersUser: null,
  monthOrdersUniversity: null,
  monthCompletedOrders: null,
  monthCompletedOrdersUser: null,
  monthCompletedOrdersUniversity: null,
  monthRejectedOrders: null,
  monthUnpaidOrders: null,
  monthUnpaidOrdersUser: null,
  monthUnpaidOrdersUniversity: null,
  earningsByMonth: null,
  earningsForMonth: null,
  ordersByMonths: null,
  ordersByMonth: null,
};

export function DashboardReducer(
  prevState = INITIAL_STATE,
  action: DashboardActionTypes
) {
  switch (action.type) {
    case DashboardActions.SET_DASHBOARD:
      return { ...prevState, ...action.payload };
    default:
      return prevState;
  }
}
