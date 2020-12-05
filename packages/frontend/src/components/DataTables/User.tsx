import React, { FC, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { textFilter } from 'react-bootstrap-table2-filter';

import Alert from '../../components/UI/Alert';
import { User } from 'src/redux/types/user';
import Table from './index';
import { changeUserBlockStatus, restUserResponse } from '@actions';
import { useThunkDispatch } from '@dispatch';
import { createSelector } from 'reselect';
import { AppState } from '@reducers/index';
import { useSelector } from 'react-redux';

interface Props {
  users: User[];
  role: string;
}

const buttonFormatter = (
  role: string,
  changeUserBlockedStatus: (data: User) => () => void
) => (_: any, row: User) => (
  <>
    <button
      name="View User"
      className="btn btn-warning"
      data-toggle="tooltip"
      data-placement="top"
      title={`View User - ${row.name}`}
    >
      <Link to={`/user/${row._id}`} style={{ color: '#fff' }}>
        <i className="far fa-eye" />
      </Link>
    </button>
    {role === 'admin' && (
      <button
        name="Block User"
        className={`btn ${!row.blocked ? 'btn-danger' : 'btn-primary'} padding`}
        type="button"
        data-toggle="tooltip"
        data-placement="top"
        title={`${!row.blocked ? 'Block' : 'Unblock'} User - ${row.name}`}
        onClick={changeUserBlockedStatus(row)}
      >
        <i className={`fas ${!row.blocked ? 'fa-ban' : 'fa-unlock'}`} />
      </button>
    )}
  </>
);

const imgFormatter = (_: any, row: User) => (
  <img src={`${row.picture}`} alt={row.name} width="30" height="30" />
);

const columns = (
  role: string,
  changeUserBlockedStatus: (data: User) => () => void
) => [
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
    formatter:
      role === 'admin' || role === 'worker'
        ? buttonFormatter(role, changeUserBlockedStatus)
        : null,
    align: 'center',
    headerAlign: 'center',
    csvExport: false,
  },
];

const redux = createSelector(
  (state: AppState) => state.user.message,
  (state: AppState) => state.user.status,
  (message, status) => ({ message, status })
);

const UserDataTable: FC<Props> = ({ users, role }) => {
  const dispatch = useThunkDispatch();
  const { message, status } = useSelector(redux);

  const clearResponse = () => dispatch(restUserResponse());

  const changeUserBlockedStatus = (data: User) => () => {
    dispatch(changeUserBlockStatus(!data.blocked, data._id));
  };

  useEffect(() => {
    return () => {
      dispatch(restUserResponse());
    };
  }, [dispatch]);

  return (
    <>
      {message && (
        <Alert
          message={message}
          clear={clearResponse}
          className={status === 200 ? 'alert-success' : 'alert-danger'}
        />
      )}
      <div className="DataTable card-body col-12">
        <Table
          data={users}
          columns={columns(role, changeUserBlockedStatus)}
          exportCSV
          withClear
        />
      </div>
    </>
  );
};

export default React.memo(UserDataTable);
