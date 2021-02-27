import { CartFront as Cart } from '@job/common';

export enum CartActions {
  SET_CART = 'SET_CART',
  ADD_FILE = 'ADD_FILE',
  SET_CART_RESPONSE = 'SET_CART_RESPONSE',
}

interface SetCart {
  type: typeof CartActions.SET_CART;
  payload: { cart: Cart };
}

interface SetCartResponse {
  type: typeof CartActions.SET_CART_RESPONSE;
  payload: { message: string; status: number | null };
}

export type CartActionTypes = SetCart | SetCartResponse;
