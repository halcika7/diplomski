import { axios } from '@axios';

// types
import { AppThunkDispatch } from '../AppThunkDispatch';
import { Order, OrderActionTypes, OrderActions } from '../types/order';
import { PostOrderErrors, InitialOrderErrors } from '../reducers/order';
import { setCart, resetUploadErrors } from '@actions';
import { CartFront as Cart, Order as FullOrder, OrderType } from '@job/common';

export const setOrderMessage = (
  message: string,
  status: number | null
): OrderActionTypes => ({
  type: OrderActions.SET_ORDER_MESSAGE,
  payload: { message, status },
});

const setOrderErrors = (errors: PostOrderErrors): OrderActionTypes => ({
  type: OrderActions.SET_ORDER_ERRORS,
  payload: errors,
});

export const postOrder = (orderedFor: string) => async (
  dispatch: AppThunkDispatch
) => {
  const { data, status } = await axios.post<{
    cart?: Cart;
    errors?: PostOrderErrors;
    message: string;
  }>('/order/', { orderedFor });

  if (data.message) {
    dispatch(setOrderMessage(data.message, status));
  }

  if (data.cart) {
    dispatch(setOrderErrors(InitialOrderErrors));
    dispatch(resetUploadErrors);
    dispatch(setCart(data.cart));
  }

  if (data.errors) {
    dispatch(setOrderErrors(data.errors));
  }
};

export const setOrders = (orders: Order[] | null): OrderActionTypes => ({
  type: OrderActions.SET_ORDERS,
  payload: orders,
});

export const getOrders = (orderType: OrderType) => async (
  dispatch: AppThunkDispatch
) => {
  const { data, status } = await axios.get<{ orders: Order[] }>(
    `/order/orders/${orderType}`
  );

  if (status === 200) {
    dispatch(setOrders(data.orders));
  }
};

export const setOrder = (order: FullOrder | null): OrderActionTypes => ({
  type: OrderActions.SET_ORDER,
  payload: order,
});

export const getOrder = (id: string) => async (dispatch: AppThunkDispatch) => {
  const { data, status } = await axios.get<{
    order: FullOrder;
    message: string;
  }>(`/order/${id}`);

  if (status === 400) {
    return dispatch(setOrderMessage(data.message, status));
  }

  return dispatch(setOrder(data.order));
};

const setOrderStatus = (type: OrderType, id: string): OrderActionTypes => ({
  type: OrderActions.SET_ORDER_STATUS,
  payload: { id, type },
});

export const setIsOrderStatusChanging = (val: boolean): OrderActionTypes => ({
  type: OrderActions.SET_ORDER_CHANGING_STATUS,
  payload: val,
});

export const updateOrderStatus = (type: OrderType, id: string) => async (
  dispatch: AppThunkDispatch
) => {
  dispatch(setIsOrderStatusChanging(true));

  const { data, status } = await axios.patch<{
    message: string;
  }>(`/order/${type}/${id}`);

  dispatch(setOrderMessage(data.message, status));

  if (status === 200 || data.message.includes('Order already has status -> ')) {
    dispatch(setOrderStatus(type, id));
  }

  dispatch(setIsOrderStatusChanging(false));
};
