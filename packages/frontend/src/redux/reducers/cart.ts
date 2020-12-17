import { CartActionTypes, CartActions } from '../types/cart';
import { CartFront } from '@job/common';

export const INITIAL_STATE: CartFront = {
  documents: [],
  totalCost: 0,
};

export function CartReducer(
  prevState = INITIAL_STATE,
  action: CartActionTypes
) {
  switch (action.type) {
    case CartActions.SET_CART:
      return { ...INITIAL_STATE, ...action.payload.cart };
    default:
      return prevState;
  }
}
