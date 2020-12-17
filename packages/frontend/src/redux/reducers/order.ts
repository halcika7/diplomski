import { OrderActionTypes, OrderActions, Order } from '../types/order';
import { Order as FullOrder } from '@job/common';

export interface PostOrderErrors {
  useFor: string;
}

export interface OrderState {
  orders: Order[] | null;
  order: FullOrder | null;
  message: string;
  status: number | null;
  errors: PostOrderErrors;
  isChangingStatus: boolean;
}

export const InitialOrderErrors = {
  useFor: '',
};

export const INITIAL_STATE: OrderState = {
  orders: null,
  order: null,
  message: '',
  status: null,
  errors: InitialOrderErrors,
  isChangingStatus: false,
};

export function OrderReducer(
  prevState = INITIAL_STATE,
  action: OrderActionTypes
) {
  switch (action.type) {
    case OrderActions.SET_ORDERS:
      return { ...INITIAL_STATE, orders: action.payload };
    case OrderActions.SET_ORDER: {
      return { ...prevState, order: action.payload };
    }
    case OrderActions.SET_ORDER_MESSAGE: {
      return { ...prevState, ...action.payload };
    }
    case OrderActions.SET_ORDER_CHANGING_STATUS: {
      return { ...prevState, isChangingStatus: action.payload };
    }
    case OrderActions.SET_ORDER_STATUS: {
      const { type, id } = action.payload;
      const order = prevState.order ? { ...prevState.order } : null;
      const orders = Array.isArray(prevState.orders)
        ? [...prevState.orders]
        : prevState.orders;

      if (order) {
        order.status = type;
      }

      if (orders) {
        const index = orders.findIndex(order => order._id === id);

        orders[index] = {
          ...orders[index],
          status: orders[index].status,
        };
      }

      return { ...prevState, orders, order };
    }
    default:
      return prevState;
  }
}
