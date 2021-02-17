import { FC } from 'react';

// components
import { Link } from 'react-router-dom';
import Table from './index';

// types
import { Order as OrderType } from 'src/redux/types/order';
import { UserRole, OrderType as OrderStatus } from '@job/common';

type UpdateStatusAction = (type: OrderStatus, id: string) => () => void;

const buttonFormatter = (role: UserRole, updateStatus: UpdateStatusAction) => (
  _: undefined,
  row: OrderType
) => (
  <>
    <button className="btn btn-warning" type="button">
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
      (role === 'worker' && row.status === 'approved')) && (
      <button
        className="btn btn-danger padding"
        data-toggle="tooltip"
        data-placment="top"
        title="Reject Order"
        onClick={updateStatus('rejected', row._id)}
        type="button"
      >
        <i className="far fa-times-circle" />
      </button>
    )}
    {((role === 'administration' && row.status === 'pending') ||
      (role === 'worker' && row.status === 'approved')) && (
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
          type="button"
        >
          <i className="fas fa-check" />
        </button>
      </>
    )}
    {role === 'worker' && row.status === 'finished' && (
      <button
        className="btn btn-success padding"
        data-toggle="tooltip"
        data-placement="top"
        title="Pay Order"
        onClick={updateStatus('completed', row._id)}
        type="button"
      >
        <i className="fas fa-money-bill-alt" />
      </button>
    )}
  </>
);

const dateFormatter = (_: undefined, row: OrderType) => (
  <span>{new Date(row.createdAt).toLocaleString()}</span>
);

const rowClasses = (row: OrderType) =>
  // eslint-disable-next-line no-nested-ternary
  row.status === 'completed'
    ? 'bg-success'
    : row.status === 'rejected'
    ? 'bg-danger'
    : '';

const priceFormatter = (_: undefined, row: OrderType) =>
  `${row.totalCost.toLocaleString(undefined, {
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  })} KM`;

const columns = (role: UserRole, updateStatus: UpdateStatusAction) => [
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
  role?: UserRole;
  updateStatus: UpdateStatusAction;
}

const Order: FC<Props> = ({ data, role, updateStatus }) => (
  <div className="row">
    <div className="col-12 card">
      <div className="DataTable Orders card-body col-12">
        <Table
          data={data}
          columns={columns(role as UserRole, updateStatus)}
          exportCSV
          withClear
          rowClasses={rowClasses}
        />
      </div>
    </div>
  </div>
);

export default Order;
