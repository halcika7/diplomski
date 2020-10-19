/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import SmallSpinner from '@components/UI/Spinner/SmallSpinner';
// import FilesTable from '@components/UI/FilesTable/FilesTable';
import Alert from '@components/UI/Alert';

const Order = (props: any) => {
  const id = new URLSearchParams(props.location.search).get('id');
  const [redirect, setRedirect] = useState<any>(false);
  const [loading, setLoading] = useState<any>(true);

  useEffect(() => {
    props.getOrder(id, props.history.push);
  }, []);

  useEffect(() => {
    if (
      Object.keys(props.order).length > 0 &&
      ((props.role === 'professor' && props.id !== props.order.orderedBy._id) ||
        (props.role === 'administration' &&
          props.order.orderedFor !== 'University') ||
        props.order.deleted)
    ) {
      setRedirect(true);
    }
    if (
      Object.keys(props.order).length > 0 &&
      ((props.role === 'professor' && props.id === props.order.orderedBy._id) ||
        (props.role === 'administration' &&
          props.order.orderedFor === 'University') ||
        props.role === 'admin' ||
        props.role === 'worker')
    ) {
      setLoading(false);
    }
  }, [props.order]);

  const updateOrderButton = (type: any) => {
    props.updateOrder(props.order._id, props.id, type, props.history.push);
  };

  return redirect ? (
    <Redirect to="/" />
  ) : !loading && Object.keys(props.order).length > 0 ? (
    <React.Fragment>
      <Helmet>
        <title>Order</title>
        <meta name="description" content="Order page in Print shop app" />
        <meta
          property="og:description"
          content="Order page in Print shop app"
        />
      </Helmet>
      {props.successMessage && (
        <Alert
          message={props.successMessage}
          clear={props.clearOrderMessages}
          className="success-alert"
        />
      )}
      {props.failedMessage && (
        <Alert
          message={props.failedMessage}
          clear={props.clearOrderMessages}
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
                    Ordered by {props.order.orderedBy.name},{' '}
                    {new Date(props.order.createdAt).toLocaleString()}
                  </p>
                  <p>Ordered for {props.order.orderedFor} use</p>
                  <p>Status - {props.order.status}</p>
                  <p>Paid - {props.order.paid.toString().toUpperCase()}</p>
                  {props.order.deleted && (
                    <p style={{ fontWeight: 900, color: '#f00' }}>
                      This Order is deleted!
                    </p>
                  )}
                </div>
                <div className="col-12">
                  {props.role === 'worker' &&
                    props.order.status === 'approved' && (
                      <button
                        className="btn btn-sm btn-info"
                        onClick={() => updateOrderButton('finished')}
                      >
                        <i className="fas fa-check"></i>
                        Finish Order
                      </button>
                    )}
                  {props.role === 'worker' &&
                    props.order.status === 'finished' &&
                    !props.order.paid && (
                      <button
                        className="btn btn-sm btn-success"
                        onClick={() => updateOrderButton('paid')}
                      >
                        <i className="fas fa-money-bill-alt"></i>
                        Confirm that order was paid
                      </button>
                    )}
                  {props.role === 'administration' &&
                    props.order.status === 'pending' && (
                      <button
                        className="btn btn-sm btn-primary"
                        onClick={() => updateOrderButton('approved')}
                      >
                        <i className="fas fa-check"></i>
                        Approve Order
                      </button>
                    )}
                  {((props.role === 'administration' &&
                    props.order.status === 'pending') ||
                    (props.role === 'worker' &&
                      props.order.status === 'approved')) && (
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => updateOrderButton('rejected')}
                    >
                      <i className="far fa-times-circle"></i>
                      Reject Order
                    </button>
                  )}
                  {props.role === 'admin' &&
                    ((props.order.status === 'finished' &&
                      props.order.paid &&
                      !props.order.deleted) ||
                      props.order.status === 'rejected') && (
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() =>
                          props.deleteOrder(props.order._id, props.history.push)
                        }
                      >
                        <i className="far fa-times-circle"></i>
                        Delete Order
                      </button>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*<FilesTable
          files={props.order.documents}
          totalprice={props.order.totalCost}
          hideFooter
        />*/}
      </div>
    </React.Fragment>
  ) : (
    <div className="row">
      <Helmet>
        <title>Order</title>
        <meta name="description" content="Order page in Print shop app" />
        <meta
          property="og:description"
          content="Order page in Print shop app"
        />
      </Helmet>
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <SmallSpinner />
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Order);
