import { PostOrderErrors } from '@reducers/order';
import { Order as FullOrder, OrderType } from '@job/common';

export interface Order {
  _id: string;
  createdAt: string;
  orderedFor: string;
  status: string;
  totalCost: number;
}

export enum OrderActions {
  SET_ORDERS = 'SET_ORDERS',
  SET_ORDER = 'SET_ORDER',
  SET_ORDER_MESSAGE = 'SET_ORDER_MESSAGE',
  SET_ORDER_ERRORS = 'SET_ORDER_ERRORS',
  SET_ORDER_STATUS = 'SET_ORDER_STATUS',
  SET_ORDER_CHANGING_STATUS = 'SET_ORDER_CHANGING_STATUS',
}

interface SetOrders {
  type: typeof OrderActions.SET_ORDERS;
  payload: Order[] | null;
}

interface SetOrder {
  type: typeof OrderActions.SET_ORDER;
  payload: FullOrder | null;
}

interface SetOrderMessage {
  type: typeof OrderActions.SET_ORDER_MESSAGE;
  payload: { message: string; status: number | null };
}

interface SetOrderErrors {
  type: typeof OrderActions.SET_ORDER_ERRORS;
  payload: PostOrderErrors;
}

interface SetOrderStatus {
  type: typeof OrderActions.SET_ORDER_STATUS;
  payload: { id: string; type: OrderType };
}

interface SetOrderChangingStatus {
  type: typeof OrderActions.SET_ORDER_CHANGING_STATUS;
  payload: boolean;
}

export type OrderActionTypes =
  | SetOrders
  | SetOrder
  | SetOrderMessage
  | SetOrderStatus
  | SetOrderChangingStatus
  | SetOrderErrors;
