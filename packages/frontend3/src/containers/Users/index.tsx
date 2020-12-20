import { useThunkDispatch } from '@dispatch';
import { AppState } from '@reducers/index';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import UserDataTable from '@components/DataTables/User';
import { getUsers, setUsers } from '@actions';
import { useEffect } from 'react';
import Spinner from '@components/UI/Spinner/Spinner';
import { User } from 'src/redux/types/user';
import { UserRole } from '@job/common';

interface Props extends Record<string, UserRole | string | undefined> {
  usersType?: UserRole | 'all';
  title?: string;
}

const reduxProps = createSelector(
  (state: AppState) => state.auth.role,
  (state: AppState) => state.user.users,
  (state: AppState) => state.user.loading,
  (role, users, loading) => ({ role, users, loading })
);

const Users: FC<Props> = ({ title, usersType = 'all' }) => {
  const { role, users, loading } = useSelector(reduxProps);
  const dispatch = useThunkDispatch();

  useEffect(() => {
    dispatch(getUsers(usersType));
  }, [dispatch, usersType]);

  useEffect(() => {
    return () => {
      dispatch(setUsers(null));
    };
  }, [dispatch]);

  if (loading)
    return (
      <div className="row">
        <div className="col-12 card min-height-75vh ">
          <div className="card-header">
            <h2 className="title">{title}</h2>
          </div>
          <div className="card-body">
            <Spinner />
          </div>
        </div>
      </div>
    );

  return (
    <>
      <Helmet>
        <title>Users Table</title>
        <meta name="description" content="Users Table page in Print shop app" />
        <meta
          property="og:description"
          content="Users Table page in Print shop app"
        />
      </Helmet>
      <div className="row">
        <div className="col-12 card">
          <div className="card-header">
            <h2 className="title">{title}</h2>
          </div>
          <UserDataTable role={role as UserRole} users={users as User[]} />
        </div>
      </div>
    </>
  );
};

export default Users;
