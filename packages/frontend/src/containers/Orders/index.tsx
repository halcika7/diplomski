import React, { FC, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { OrderType } from '@job/common';
import {
  getOrders,
  setOrders,
  updateOrderStatus,
  setOrderMessage,
} from '@actions';
import { useThunkDispatch } from '@dispatch';
import Order from '@components/DataTables/Order';
import { createSelector } from 'reselect';
import { AppState } from '@reducers/index';
import { useSelector } from 'react-redux';
import Spinner from '@components/UI/Spinner/Spinner';
import Alert from '@components/UI/Alert';
import { AnyDictionary } from '@job/common';

const redux = createSelector(
  (state: AppState) => state.order.orders,
  (state: AppState) => state.order.message,
  (state: AppState) => state.order.status,
  (state: AppState) => state.order.isChangingStatus,
  (orders, message, status, isChanging) => ({
    orders,
    message,
    status,
    isChanging,
  })
);

interface Props extends AnyDictionary {
  orderType?: OrderType;
  role?: string;
}

const OrdersDataTable: FC<Props> = ({ orderType, role }) => {
  const dispatch = useThunkDispatch();
  const { orders, message, status, isChanging } = useSelector(redux);

  const updateStatus = (
    type: 'rejected' | 'finished' | 'approved' | 'completed',
    id: string
  ) => () => {
    if (isChanging) return;

    dispatch(updateOrderStatus(type, id));
  };

  const resetResponse = () => dispatch(setOrderMessage('', null));

  useEffect(() => {
    if (orderType) {
      dispatch(getOrders(orderType));
    }
  }, [dispatch, orderType]);

  useEffect(() => {
    return () => {
      dispatch(setOrders(null));
      dispatch(setOrderMessage('', null));
    };
  }, [dispatch]);

  if (!orders)
    return (
      <div className="card-body">
        <Spinner />
      </div>
    );

  return (
    <>
      <Helmet>
        <title>Orders Table</title>
        <meta
          name="description"
          content="Orders Table page in Print shop app"
        />
        <meta
          property="og:description"
          content="Orders Table page in Print shop app"
        />
      </Helmet>
      {message && (
        <Alert
          message={message}
          clear={resetResponse}
          className={status === 200 ? 'alert-success' : 'alert-danger'}
        />
      )}
      <Order data={orders} role={role} updateStatus={updateStatus} />
    </>
  );
};

export default React.memo(OrdersDataTable);
