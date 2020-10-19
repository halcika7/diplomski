import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';

import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, {
  Search,
  CSVExport,
} from 'react-bootstrap-table2-toolkit';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './DataTable.css';

import Alert from '../../components/UI/Alert';

const { SearchBar, ClearSearchButton } = Search;
const { ExportCSVButton } = CSVExport;

const OrdersDataTable = (props: any) => {
  const buttonFormatter = (_: any, row: any) => (
    <React.Fragment>
      <button className="btn btn-warning">
        <Link
          to={`/order?id=${row._id}`}
          style={{ color: '#fff' }}
          data-toggle="tooltip"
          data-placment="top"
          title="See Order"
        >
          <i className="far fa-eye" />
        </Link>
      </button>
      {props.userRole === 'administration' &&
        row.status === 'pending' && (
          <React.Fragment>
            <button
              className="btn btn-danger padding"
              data-toggle="tooltip"
              data-placment="top"
              title="Reject Order"
              onClick={() => updateOrderButton(row._id, 'rejected')}
            >
              <i className="far fa-times-circle"></i>
            </button>
            <button
              className="btn btn-info padding"
              data-toggle="tooltip"
              data-placment="top"
              title="Approve Order"
              onClick={() => updateOrderButton(row._id, 'approved')}
            >
              <i className="fas fa-check"></i>
            </button>
          </React.Fragment>
        )}
      {(props.userRole === 'worker' || props.userRole === 'admin') &&
        row.status !== 'pending' && (
          <React.Fragment>
            {row.status === 'approved' && (
              <React.Fragment>
                <button
                  className="btn btn-danger padding"
                  data-toggle="tooltip"
                  data-placment="top"
                  title="Reject Order"
                  onClick={() => updateOrderButton(row._id, 'rejected')}
                >
                  <i className="far fa-times-circle"></i>
                </button>
                <button
                  className="btn btn-info padding"
                  data-toggle="tooltip"
                  data-placment="top"
                  title="Finish Order"
                  onClick={() => updateOrderButton(row._id, 'finished')}
                >
                  <i className="fas fa-check"></i>
                </button>
              </React.Fragment>
            )}
            {row.status === 'finished' && row.paid === false && (
              <button
                className="btn btn-success padding"
                data-toggle="tooltip"
                data-placment="top"
                title="Pay Order"
                onClick={() => updateOrderButton(row._id, 'paid')}
              >
                <i className="fas fa-money-bill-alt"></i>
              </button>
            )}
          </React.Fragment>
        )}
      {props.userRole === 'admin' &&
        ((row.status === 'finished' && row.paid && !row.deleted) ||
          row.status === 'rejected') && (
          <button
            className="btn btn-danger padding"
            data-toggle="tooltip"
            data-placment="top"
            title="Delete Order"
            onClick={() => deleteOrder(row._id)}
          >
            <i className="far fa-times-circle"></i>
          </button>
        )}
    </React.Fragment>
  );

  const dateFormatter = (_: any, row: any) => (
    <span>{new Date(row.createdAt).toLocaleString()}</span>
  );

  const rowClasses = (row: any) => {
    return row.status === 'finished' && row.paid
      ? 'bg-success'
      : row.status === 'rejected'
      ? 'bg-danger'
      : '';
  };

  const priceFormatter = (_: any, row: any) =>
    row.totalCost.toLocaleString(undefined, { maximumFractionDigits: 2 }) +
    ' KM';

  const [data, setData] = useState<any>([]);
  const [columns] = useState<any>([
    {
      dataField: 'createdAt',
      text: 'Date when ordered',
      formatter: dateFormatter,
      align: 'center',
      headerAlign: 'center',
      sort: true,
    },
    {
      dataField: 'totalCost',
      text: 'Total Cost',
      formatter: priceFormatter,
      align: 'center',
      headerAlign: 'center',
      sort: true,
    },
    {
      dataField: 'orderedFor',
      text: 'Ordered for',
      align: 'center',
      headerAlign: 'center',
      sort: true,
    },
    {
      dataField: 'status',
      text: 'Status',
      align: 'center',
      headerAlign: 'center',
      sort: true,
    },
    {
      dataField: 'paid',
      text: 'Paid',
      align: 'center',
      headerAlign: 'center',
      sort: true,
    },
    {
      dataField: 'actions',
      text: 'Actions',
      formatter: buttonFormatter,
      align: 'center',
      headerAlign: 'center',
      csvExport: false,
    },
  ]);
  useEffect(() => {
    startFunct();
    return () => {
      setData([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    startFunct();
    return () => {
      setData([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.history.location]);

  useEffect(() => {
    setData([...props.orders]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.orders]);

  useEffect(() => {
    startFunct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.successMessage]);

  const startFunct = () => {
    if (
      (props.userRole === 'admin' || props.userRole === 'worker') &&
      props.role === 'all-orders'
    ) {
      props.allOrders(null, null, props.history.push);
    }
    if (props.userRole === 'professor' && props.role === 'all-orders') {
      props.allOrders(props.id, null, props.history.push);
    }
    if (props.userRole === 'administration' && props.role === 'all-orders') {
      props.allOrders(null, 'University', props.history.push);
    }

    if (
      (props.userRole === 'admin' || props.userRole === 'worker') &&
      props.role === 'completed-orders'
    ) {
      props.allOrders(null, null, props.history.push, 'Finished');
    }
    if (props.userRole === 'professor' && props.role === 'completed-orders') {
      props.allOrders(props.id, null, props.history.push, 'Finished');
    }
    if (
      props.userRole === 'administration' &&
      props.role === 'completed-orders'
    ) {
      props.allOrders(null, 'University', props.history.push, 'Finished');
    }

    if (
      (props.userRole === 'admin' || props.userRole === 'worker') &&
      props.role === 'pending-orders'
    ) {
      props.allOrders(null, null, props.history.push, 'Pending University');
    }
    if (props.userRole === 'professor' && props.role === 'pending-orders') {
      props.allOrders(props.id, null, props.history.push, 'Pending University');
    }
    if (
      props.userRole === 'administration' &&
      props.role === 'pending-orders'
    ) {
      props.allOrders(
        null,
        'University',
        props.history.push,
        'Pending University'
      );
    }

    if (
      (props.userRole === 'admin' || props.userRole === 'worker') &&
      props.role === 'rejected-orders'
    ) {
      props.allOrders(null, null, props.history.push, 'Rejected');
    }
    if (props.userRole === 'professor' && props.role === 'rejected-orders') {
      props.allOrders(props.id, null, props.history.push, 'Rejected');
    }
    if (
      props.userRole === 'administration' &&
      props.role === 'rejected-orders'
    ) {
      props.allOrders(null, 'University', props.history.push, 'Rejected');
    }

    if (
      (props.userRole === 'admin' || props.userRole === 'worker') &&
      props.role === 'paid-orders'
    ) {
      props.allOrders(null, null, props.history.push, 'Finished', true);
    }
    if (props.userRole === 'professor' && props.role === 'paid-orders') {
      props.allOrders(props.id, null, props.history.push, 'Finished', true);
    }
    if (props.userRole === 'administration' && props.role === 'paid-orders') {
      props.allOrders(null, 'University', props.history.push, 'Finished', true);
    }

    if (
      (props.userRole === 'admin' || props.userRole === 'worker') &&
      props.role === 'unpaid-orders'
    ) {
      props.allOrders(null, null, props.history.push, 'Finished', false);
    }
    if (props.userRole === 'professor' && props.role === 'unpaid-orders') {
      props.allOrders(props.id, null, props.history.push, 'Finished', false);
    }
    if (props.userRole === 'administration' && props.role === 'unpaid-orders') {
      props.allOrders(
        null,
        'University',
        props.history.push,
        'Finished',
        false
      );
    }

    if (
      (props.userRole === 'admin' || props.userRole === 'worker') &&
      props.role === 'new-orders'
    ) {
      props.allOrders(null, null, props.history.push, 'Approved');
    }

    if (props.userRole === 'admin' && props.role === 'deleted-orders') {
      props.deletedOrders(props.history.push);
    }
  };

  const updateOrderButton = (id: any, type: any) => {
    props.updateOrder(id, props.id, type, props.history.push, true);
  };

  const deleteOrder = (id: any) => {
    props.deleteOrder(id, props.history.push, true);
  };

  const [options] = useState({
    sizePerPage: 10,
    pageStartIndex: 1,
    paginationSize: 3,
    showTotal: true,
    hideSizePerPage: true,
    paginationTotalRenderer: (start: any, to: any, total: any) => (
      <p>
        {' '}
        From {start} to {to}, totals is {total}{' '}
      </p>
    ),
  });

  return (
    <React.Fragment>
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
      {props.successMessage && (
        <Alert
          message={props.successMessage}
          clear={props.clearOrderMessages}
          className="success-alert"
        />
      )}
      {props.failedMessage && (
        <Alert message={props.failedMessage} clear={props.clearOrderMessages} />
      )}
      <div className="row">
        <div className="col-12 card">
          <div className="DataTable card-body col-12">
            <ToolkitProvider
              bootstrap4
              search
              keyField="_id"
              data={data}
              columns={columns}
              exportCSV
            >
              {props => (
                <React.Fragment>
                  <div className="row mb-20">
                    <div className="col-sm-6">
                      <ExportCSVButton {...props.csvProps}>
                        Export CSV
                      </ExportCSVButton>
                    </div>
                    <div className="col-sm-6">
                      <SearchBar {...props.searchProps} tableId="1" />
                      <ClearSearchButton
                        {...props.searchProps}
                        className="btn-sm"
                      />
                    </div>
                  </div>
                  <BootstrapTable
                    noDataIndication={() => <div>No data available</div>}
                    wrapperClasses={'table-responsive UsersTable'}
                    {...props.baseProps}
                    striped
                    hover
                    bordered={false}
                    filter={filterFactory()}
                    pagination={paginationFactory(options)}
                    rowClasses={rowClasses}
                  />
                </React.Fragment>
              )}
            </ToolkitProvider>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default React.memo(OrdersDataTable);
