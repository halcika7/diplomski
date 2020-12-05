import {
  OrderActionTypes,
  OrderActions,
  Order,
  FullOrder,
} from '../types/order';

export interface PostOrderErrors {
  useFor: string;
}

export interface OrderState {
  orders: Order[] | null;
  order: FullOrder | null;
  message: string;
  status: number | null;
  errors: PostOrderErrors;
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
    default:
      return prevState;
  }
}
