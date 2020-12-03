import { FileDocument } from './cart';

export type OrderType =
  | 'all'
  | 'completed'
  | 'pending'
  | 'rejected'
  | 'paid'
  | 'unpaid'
  | 'approved'
  | 'deleted';

export interface Order {
  _id: string;
  createdAt: string;
  orderedFor: string;
  status: string;
  deleted: boolean;
  paid: boolean;
  totalCost: number;
}

export interface FullOrder extends Order {
  documents: FileDocument[];
  orderedBy: { _id: string; name: string };
}

export enum OrderActions {
  SET_ORDERS = 'SET_ORDERS',
  SET_ORDER = 'SET_ORDER',
  SET_ORDER_MESSAGE = 'SET_ORDER_MESSAGE',
}

interface SetOrders {
  type: typeof OrderActions.SET_ORDERS;
  payload: Order[];
}

interface SetOrder {
  type: typeof OrderActions.SET_ORDER;
  payload: FullOrder | null;
}

interface SetOrderMessage {
  type: typeof OrderActions.SET_ORDER_MESSAGE;
  payload: { message: string; status: number | null };
}

export type OrderActionTypes = SetOrders | SetOrder | SetOrderMessage;
