import { axios } from '@axios';
import { AppThunkDispatch } from '../AppThunkDispatch';
import { CartActionTypes, CartActions } from '../types/cart';

import { CartFront as Cart } from '@job/common';

export const setCart = (cart: Cart): CartActionTypes => ({
  type: CartActions.SET_CART,
  payload: { cart },
});

export const getCart = async (dispatch: AppThunkDispatch) => {
  const { data } = await axios.get<{
    cart: Cart;
  }>('/cart/');
  dispatch(setCart(data.cart));
};

export const removeDocument = (id: string) => async (
  dispatch: AppThunkDispatch
) => {
  const { data } = await axios.put<{
    cart: Cart;
  }>(`/cart/${id}`);
  dispatch(setCart(data.cart));
};

export const clearCart = async (dispatch: AppThunkDispatch) => {
  const { data } = await axios.put<{
    cart: Cart;
  }>(`/cart/`);
  dispatch(setCart(data.cart));
};
