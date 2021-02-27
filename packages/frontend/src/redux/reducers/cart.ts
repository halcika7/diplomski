import { CartActionTypes, CartActions } from '../types/cart';
import { CartFront } from '@job/common';

export type Cart = CartFront & {
  message: string;
  status: number | null;
};

export const INITIAL_STATE: Cart = {
  documents: [],
  totalCost: 0,
  message: '',
  status: null,
};

export function CartReducer(
  prevState = INITIAL_STATE,
  action: CartActionTypes
) {
  switch (action.type) {
    case CartActions.SET_CART: {
      let cart = {
        documents: prevState.documents,
        totalCost: prevState.totalCost,
      };

      if (action.payload.cart) {
        cart = { ...action.payload.cart };
      }

      return { ...INITIAL_STATE, ...cart };
    }
    case CartActions.SET_CART_RESPONSE:
      return { ...prevState, ...action.payload };
    default:
      return prevState;
  }
}
