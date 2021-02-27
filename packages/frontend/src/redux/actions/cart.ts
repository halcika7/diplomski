import { axios } from '@axios';
import { AppThunkDispatch } from '../AppThunkDispatch';
import { CartActionTypes, CartActions } from '../types/cart';

import { CartFront as Cart } from '@job/common';

export const setCart = (cart: Cart): CartActionTypes => ({
  type: CartActions.SET_CART,
  payload: { cart },
});

export const setCartResponse = (
  message: string,
  status: number | null
): CartActionTypes => ({
  type: CartActions.SET_CART_RESPONSE,
  payload: { message, status },
});

export const getCart = async (dispatch: AppThunkDispatch) => {
  const { data } = await axios.get<{
    cart: Cart;
  }>('/cart/');

  dispatch(setCart(data?.cart));

  if (!data?.cart) {
    dispatch(setCartResponse('Could not fetch cart', 400));
  }
};

export const removeDocument = (id: string) => async (
  dispatch: AppThunkDispatch
) => {
  const { data } = await axios.delete<{
    cart: Cart;
  }>(`/cart/${id}`);
  dispatch(setCart(data?.cart));

  if (!data?.cart) {
    dispatch(setCartResponse('Document was not removed.', 400));
  }
};

export const clearCart = async (dispatch: AppThunkDispatch) => {
  const { data } = await axios.delete<{
    cart: Cart;
  }>(`/cart/`);
  dispatch(setCart(data?.cart));

  if (!data?.cart) {
    dispatch(setCartResponse('Unable to clear cart.', 400));
  }
};
