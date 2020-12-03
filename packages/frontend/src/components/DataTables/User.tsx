import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import BootstrapTable from 'react-bootstrap-table-next';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, {
  Search,
  CSVExport,
} from 'react-bootstrap-table2-toolkit';

// import Alert from '../../components/UI/Alert';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import './index.css';
import { User } from 'src/redux/types/user';

const { SearchBar, ClearSearchButton } = Search;
const { ExportCSVButton } = CSVExport;

interface Props {
  users: User[];
  role: string;
}

const UserDataTable: FC<Props> = ({ users, role }) => {
  const buttonFormatter = (_: any, row: User) => (
    <>
      <button
        name="View User"
        className="btn btn-warning"
        data-toggle="tooltip"
        data-placement="top"
        title={`View User - ${row.name}`}
      >
        <Link to={`/edit-user/${row._id}`} style={{ color: '#fff' }}>
          <i className="far fa-eye" />
        </Link>
      </button>
      {!row.blocked && role === 'admin' && (
        <button
          name="Block User"
          className="btn btn-danger padding"
          type="button"
          data-toggle="tooltip"
          data-placement="top"
          title={`Block User - ${row.name}`}
          // onClick={() =>
          //   props.blockUser(row._id, role, props.history.push)
          // }
        >
          <i className="fas fa-ban" />
        </button>
      )}
      {row.blocked && role === 'admin' && (
        <button
          name="Unblock User"
          className="btn btn-primary padding"
          type="button"
          data-toggle="tooltip"
          data-placement="top"
          title={`Unblock User - ${row.name}`}
          // onClick={() =>
          //   props.unblockUser(row._id, role, props.history.push)
          // }
        >
          <i className="fas fa-unlock" />
        </button>
      )}
    </>
  );

  const imgFormatter = (_: any, row: User) => (
    <img src={`${row.picture}`} alt={row.name} width="30" height="30" />
  );

  const userColumns = [
    {
      dataField: 'name',
      text: 'Name',
      filter: textFilter(),
      align: 'center',
      headerAlign: 'center',
      sort: true,
    },
    {
      dataField: 'email',
      text: 'Email',
      filter: textFilter(),
      align: 'center',
      headerAlign: 'center',
      sort: true,
    },
    {
      dataField: 'role',
      text: 'Role',
      filter: textFilter(),
      align: 'center',
      headerAlign: 'center',
      sort: true,
    },
    {
      dataField: 'phone',
      text: 'Phone Number',
      filter: textFilter(),
      align: 'center',
      headerAlign: 'center',
      sort: true,
    },
    {
      dataField: 'picture',
      formatter: imgFormatter,
      text: 'User Picture',
      align: 'center',
      headerAlign: 'center',
      sort: false,
      csvExport: false,
    },
    {
      dataField: 'actions',
      text: 'Actions',
      formatter: role === 'admin' || role === 'worker' ? buttonFormatter : null,
      align: 'center',
      headerAlign: 'center',
      csvExport: false,
    },
  ];

  const options = {
    sizePerPage: 10,
    pageStartIndex: 1,
    paginationSize: 3,
    showTotal: true,
    hideSizePerPage: true,
    paginationTotalRenderer: (start: number, to: number, total: number) => (
      <p>
        From {start} to {to}, totals is {total}
      </p>
    ),
  };

  return (
    <div className="DataTable card-body col-12">
      <ToolkitProvider
        bootstrap4
        search
        keyField="_id"
        data={users}
        columns={userColumns as any}
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
                <ClearSearchButton {...props.searchProps} className="btn-sm" />
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
            />
          </React.Fragment>
        )}
      </ToolkitProvider>
    </div>
  );
};

// {props.editUser.successMessage && (
//     <Alert
//       message={props.editUser.successMessage}
//       clear={props.clearEditUserMessages}
//       className="success-alert"
//     />
//   )}
//   {props.editUser.failedMessage && (
//     <Alert
//       message={props.editUser.failedMessage}
//       clear={props.clearEditUserMessages}
//     />
//   )}

export default React.memo(UserDataTable);
