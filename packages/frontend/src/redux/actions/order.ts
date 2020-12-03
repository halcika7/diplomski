import { axios } from '@axios';

// types
import { AppThunkDispatch } from '../AppThunkDispatch';
import {
  Order,
  OrderType,
  OrderActionTypes,
  OrderActions,
  FullOrder,
} from '../types/order';

export const postOrder = (orderedFor: string) => async (
  _: AppThunkDispatch
) => {
  const { data } = await axios.post<{}>('/order/', { orderedFor });
  console.log('data', data);
};

const setOrders = (orders: Order[]): OrderActionTypes => ({
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

export const setOrderMessage = (
  message: string,
  status: number | null
): OrderActionTypes => ({
  type: OrderActions.SET_ORDER_MESSAGE,
  payload: { message, status },
});

export const getOrder = (id: string) => async (dispatch: AppThunkDispatch) => {
  const { data, status } = await axios.get<{
    order: FullOrder;
    message: string;
  }>(`/order/${id}`);

  if (status === 400) {
    dispatch(setOrderMessage(data.message, status));
  }

  return dispatch(setOrder(data.order));
};
