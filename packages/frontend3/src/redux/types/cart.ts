import { CartFront as Cart } from '@job/common';

export enum CartActions {
  SET_CART = 'SET_CART',
  ADD_FILE = 'ADD_FILE',
}

interface SetCart {
  type: typeof CartActions.SET_CART;
  payload: { cart: Cart };
}

export type CartActionTypes = SetCart;
