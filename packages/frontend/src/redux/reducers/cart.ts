import { FileDocument } from '../types/cart';
import { CartActionTypes, CartActions } from '../types/cart';

export interface CartState {
  documents: FileDocument[];
  totalCost: number;
}

export const INITIAL_STATE: CartState = {
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
