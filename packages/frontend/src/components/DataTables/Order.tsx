import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Order as OrderType } from 'src/redux/types/order';
import Table from './index';

type UpdateStatusAction = (
  type: 'rejected' | 'finished' | 'approved' | 'pay',
  id: string
) => () => void;

const buttonFormatter = (role: string, updateStatus: UpdateStatusAction) => (
  _: any,
  row: OrderType
) => (
  <>
    <button className="btn btn-warning">
      <Link
        to={`/order/${row._id}`}
        style={{ color: '#fff' }}
        data-toggle="tooltip"
        data-placment="top"
        title="See Order"
      >
        <i className="far fa-eye" />
      </Link>
    </button>
    {((role === 'administration' && row.status === 'pending') ||
      ((role === 'worker' || role === 'admin') &&
        row.status === 'approved')) && (
      <button
        className="btn btn-danger padding"
        data-toggle="tooltip"
        data-placment="top"
        title="Reject Order"
        onClick={updateStatus('rejected', row._id)}
      >
        <i className="far fa-times-circle"></i>
      </button>
    )}
    {((role === 'administration' && row.status === 'pending') ||
      ((role === 'worker' || role === 'admin') &&
        row.status === 'approved')) && (
      <>
        <button
          className="btn btn-info padding"
          data-toggle="tooltip"
          data-placment="top"
          title={`${role === 'administration' ? 'Approve' : 'Finish'} Order`}
          onClick={updateStatus(
            role === 'administration' ? 'approved' : 'finished',
            row._id
          )}
        >
          <i className="fas fa-check"></i>
        </button>
      </>
    )}
    {(role === 'worker' || role === 'admin') &&
      row.status === 'finished' &&
      !row.paid && (
        <button
          className="btn btn-success padding"
          data-toggle="tooltip"
          data-placment="top"
          title="Pay Order"
          onClick={updateStatus('pay', row._id)}
        >
          <i className="fas fa-money-bill-alt"></i>
        </button>
      )}
  </>
);

const dateFormatter = (_: any, row: OrderType) => (
  <span>{new Date(row.createdAt).toLocaleString()}</span>
);

const rowClasses = (row: OrderType) =>
  row.status === 'finished' && row.paid
    ? 'bg-success'
    : row.status === 'rejected'
    ? 'bg-danger'
    : '';

const priceFormatter = (_: any, row: OrderType) =>
  row.totalCost.toLocaleString(undefined, { maximumFractionDigits: 2 }) + ' KM';

const columns = (
  role: string,
  updateStatus: UpdateStatusAction,
) => [
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
    formatter: buttonFormatter(role, updateStatus),
    align: 'center',
    headerAlign: 'center',
    csvExport: false,
  },
];

interface Props {
  data: OrderType[];
  role?: string;
  updateStatus: UpdateStatusAction;
}

const Order: FC<Props> = ({ data, role, updateStatus }) => (
  <div className="row">
    <div className="col-12 card">
      <div className="DataTable Orders card-body col-12">
        <Table
          data={data}
          columns={columns(role as string, updateStatus)}
          exportCSV
          withClear
          rowClasses={rowClasses}
        />
      </div>
    </div>
  </div>
);

export default Order;
