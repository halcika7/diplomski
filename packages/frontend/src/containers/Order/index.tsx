import React, { useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import Spinner from '@components/UI/Spinner/Spinner';
import FilesTable from '@components/UI/FilesTable';
import Alert from '@components/UI/Alert';
import { getOrder, setOrder, setOrderMessage, updateOrderStatus } from '@actions';
import { useThunkDispatch } from '@dispatch';
import { createSelector } from 'reselect';
import { AppState } from '@reducers/index';
import { useSelector } from 'react-redux';

const redux = createSelector(
  (state: AppState) => state.order.order,
  (state: AppState) => state.order.message,
  (state: AppState) => state.order.status,
  (state: AppState) => state.order.isChangingStatus,
  (order, message, status, isChanging) => ({ order, message, status, isChanging })
);

interface Props extends Record<string, any> {
  role?: string;
}

const HelmetElement = () => (
  <Helmet>
    <title>Order</title>
    <meta name="description" content="Order page in Print shop app" />
    <meta property="og:description" content="Order page in Print shop app" />
  </Helmet>
);

const Order: FC<Props> = ({ role }) => {
  const dispatch = useThunkDispatch();
  const { order, message, isChanging, status } = useSelector(redux);
  const { id } = useParams<{ id: string }>();

  const updateStatus = (
    type: 'rejected' | 'finished' | 'approved' | 'pay',
    id: string
  ) => () => {
    if (isChanging) return;

    dispatch(updateOrderStatus(type, id));
  };

  const resetResponse = () => dispatch(setOrderMessage('', null));

  useEffect(() => {
    return () => {
      dispatch(setOrder(null));
      dispatch(setOrderMessage('', null));
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(getOrder(id));
  }, [dispatch, id]);

  if (!order) {
    return (
      <div className="row">
        <HelmetElement />
        <div className="col-12">
          <div className="card min-height-75vh">
            <div className="card-body">
              {!message && <Spinner />}
              {message && <p>{message}</p>}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <HelmetElement />
      {message && (
        <Alert
          message={message}
          clear={resetResponse}
          className={status === 200 ? 'alert-success' : 'alert-danger'}
        />
      )}
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h5 className="title">Order ID - {id}</h5>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-12 mb-5">
                  <p>
                    Ordered by {order.orderedBy.name},{' '}
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                  <p>Ordered for {order.orderedFor} use</p>
                  <p style={{ textTransform: 'capitalize' }}>
                    Status - {order.status}
                  </p>
                  <p>Paid - {order.paid.toString().toUpperCase()}</p>
                  {order.deleted && (
                    <p style={{ fontWeight: 900, color: '#f00' }}>
                      This Order is deleted!
                    </p>
                  )}
                </div>
                <div className="col-12">
                  {role === 'worker' && order.status === 'approved' && (
                    <button
                      className="btn btn-sm btn-info"
                      onClick={updateStatus('finished', id)}
                    >
                      <i className="fas fa-check"></i>
                      Finish Order
                    </button>
                  )}
                  {role === 'worker' &&
                    order.status === 'finished' &&
                    !order.paid && (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={updateStatus('pay', id)}
                      >
                        <i className="fas fa-money-bill-alt"></i>
                        Confirm that order was paid
                      </button>
                    )}
                  {role === 'administration' && order.status === 'pending' && (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={updateStatus('approved', id)}
                    >
                      <i className="fas fa-check"></i>
                      Approve Order
                    </button>
                  )}
                  {((role === 'administration' && order.status === 'pending') ||
                    (role === 'worker' && order.status === 'approved')) && (
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={updateStatus('rejected', id)}
                    >
                      <i className="far fa-times-circle"></i>
                      Reject Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <FilesTable
          documents={order.documents}
          totalPrice={order.totalCost}
          hideFooter
          deleteFile={() => {}}
          deleteFiles={() => {}}
        />
      </div>
    </>
  );
};

export default React.memo(Order);
