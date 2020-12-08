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
import { User, UserType } from 'src/redux/types/user';

interface Props extends Record<string, UserType | string | undefined> {
  usersType?: UserType;
  title?: string;
}

const reduxProps = createSelector(
  (state: AppState) => state.auth.role,
  (state: AppState) => state.user.users,
  (state: AppState) => state.user.loading,
  (role, users, loading) => ({ role, users, loading })
);

const Users: FC<Props> = ({ title, usersType }) => {
  const { role, users, loading } = useSelector(reduxProps);
  const dispatch = useThunkDispatch();

  useEffect(() => {
    if (usersType) {
      dispatch(getUsers(usersType));
    }

    return () => {
      dispatch(setUsers(null));
    };
  }, [dispatch, usersType]);

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
          <UserDataTable role={role as string} users={users as User[]} />
        </div>
      </div>
    </>
  );
};

export default Users;
