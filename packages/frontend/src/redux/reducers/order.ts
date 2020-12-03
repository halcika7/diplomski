import {
  OrderActionTypes,
  OrderActions,
  Order,
  FullOrder,
} from '../types/order';

export interface OrderState {
  orders: Order[] | null;
  order: FullOrder | null;
  message: string;
  status: number | null;
}

export const INITIAL_STATE: OrderState = {
  orders: null,
  order: null,
  message: '',
  status: null,
};

export function OrderReducer(
  prevState = INITIAL_STATE,
  action: OrderActionTypes
) {
  switch (action.type) {
    case OrderActions.SET_ORDERS:
      return { ...INITIAL_STATE, orders: action.payload };
    case OrderActions.SET_ORDER: {
      return { ...INITIAL_STATE, order: action.payload };
    }
    case OrderActions.SET_ORDER_MESSAGE: {
      return { ...INITIAL_STATE, ...action.payload };
    }
    default:
      return prevState;
  }
}
