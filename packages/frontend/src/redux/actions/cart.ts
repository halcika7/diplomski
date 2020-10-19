import { axios } from '@axios';
import { AppThunkDispatch } from '../AppThunkDispatch';
import { CartActionTypes, CartActions, Cart } from '../types/cart';

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

export const removeDocument = (id: string) => async (dispatch: AppThunkDispatch) =>  {
  const { data } = await axios.delete<{
    cart: Cart;
  }>(`/cart/${id}`);
  dispatch(setCart(data.cart));
}

export const clearCart = async (dispatch: AppThunkDispatch) =>  {
  const { data } = await axios.delete<{
    cart: Cart;
  }>(`/cart/`);
  dispatch(setCart(data.cart));
}
