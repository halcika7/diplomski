import React, { FC } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, {
  Search,
  CSVExport,
} from 'react-bootstrap-table2-toolkit';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './index.css';
import { Link } from 'react-router-dom';
import { Order as OrderType } from 'src/redux/types/order';

const { SearchBar, ClearSearchButton } = Search;
const { ExportCSVButton } = CSVExport;

const options = {
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
};

const buttonFormatter = (role: string) => (_: any, row: any) => (
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
    {role === 'administration' && row.status === 'pending' && (
      <>
        <button
          className="btn btn-danger padding"
          data-toggle="tooltip"
          data-placment="top"
          title="Reject Order"
          //   onClick={() => updateOrderButton(row._id, 'rejected')}
        >
          <i className="far fa-times-circle"></i>
        </button>
        <button
          className="btn btn-info padding"
          data-toggle="tooltip"
          data-placment="top"
          title="Approve Order"
          //   onClick={() => updateOrderButton(row._id, 'approved')}
        >
          <i className="fas fa-check"></i>
        </button>
      </>
    )}
    {(role === 'worker' || role === 'admin') && row.status !== 'pending' && (
      <>
        {row.status === 'approved' && (
          <>
            <button
              className="btn btn-danger padding"
              data-toggle="tooltip"
              data-placment="top"
              title="Reject Order"
              //   onClick={() => updateOrderButton(row._id, 'rejected')}
            >
              <i className="far fa-times-circle"></i>
            </button>
            <button
              className="btn btn-info padding"
              data-toggle="tooltip"
              data-placment="top"
              title="Finish Order"
              //   onClick={() => updateOrderButton(row._id, 'finished')}
            >
              <i className="fas fa-check"></i>
            </button>
          </>
        )}
        {row.status === 'finished' && row.paid === false && (
          <button
            className="btn btn-success padding"
            data-toggle="tooltip"
            data-placment="top"
            title="Pay Order"
            // onClick={() => updateOrderButton(row._id, 'paid')}
          >
            <i className="fas fa-money-bill-alt"></i>
          </button>
        )}
      </>
    )}
    {role === 'admin' &&
      ((row.status === 'finished' && row.paid && !row.deleted) ||
        row.status === 'rejected') && (
        <button
          className="btn btn-danger padding"
          data-toggle="tooltip"
          data-placment="top"
          title="Delete Order"
          // onClick={() => deleteOrder(row._id)}
        >
          <i className="far fa-times-circle"></i>
        </button>
      )}
  </>
);

const dateFormatter = (_: any, row: any) => (
  <span>{new Date(row.createdAt).toLocaleString()}</span>
);

const rowClasses = (row: any) =>
  row.status === 'finished' && row.paid
    ? 'bg-success'
    : row.status === 'rejected'
    ? 'bg-danger'
    : '';

const priceFormatter = (_: any, row: any) =>
  row.totalCost.toLocaleString(undefined, { maximumFractionDigits: 2 }) + ' KM';

const columns = (role: string) => [
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
    formatter: buttonFormatter(role),
    align: 'center',
    headerAlign: 'center',
    csvExport: false,
  },
];

interface Props {
  data: OrderType[];
  role?: string;
}

const Order: FC<Props> = ({ data, role }) => (
  <div className="row">
    <div className="col-12 card">
      <div className="DataTable Orders card-body col-12">
        <ToolkitProvider
          bootstrap4
          search
          keyField="_id"
          data={data}
          columns={columns(role as string) as any}
          exportCSV
        >
          {props => (
            <>
              <div className="row mb-20">
                <div className="col-sm-6">
                  {data.length > 0 && (
                    <ExportCSVButton {...props.csvProps}>
                      Export CSV
                    </ExportCSVButton>
                  )}
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
            </>
          )}
        </ToolkitProvider>
      </div>
    </div>
  </div>
);

export default Order;
