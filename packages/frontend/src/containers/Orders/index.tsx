import React, { FC, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { OrderType } from 'src/redux/types/order';
import { getOrders, setOrders } from '@actions';
import { useThunkDispatch } from '@dispatch';
import Order from '@components/DataTables/Order';
import { createSelector } from 'reselect';
import { AppState } from '@reducers/index';
import { useSelector } from 'react-redux';
import Spinner from '@components/UI/Spinner/Spinner';

const redux = createSelector(
  (state: AppState) => state.order.orders,
  orders => ({ orders })
);

interface Props extends Record<string, any> {
  orderType?: OrderType;
  role?: string;
}

const OrdersDataTable: FC<Props> = ({ orderType, role }) => {
  const dispatch = useThunkDispatch();
  const { orders } = useSelector(redux);

  useEffect(() => {
    if (orderType) {
      dispatch(getOrders(orderType));
    }
  }, [dispatch, orderType]);

  useEffect(() => {
    return () => {
      dispatch(setOrders([]));
    }
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
      <Order data={orders} role={role} />
    </>
  );
};

// {
//   props.successMessage && (
//     <Alert
//       message={props.successMessage}
//       clear={props.clearOrderMessages}
//       className="success-alert"
//     />
//   );
// }
// {
//   props.failedMessage && (
//     <Alert message={props.failedMessage} clear={props.clearOrderMessages} />
//   );
// }

export default React.memo(OrdersDataTable);
