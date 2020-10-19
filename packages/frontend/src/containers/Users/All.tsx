import { useThunkDispatch } from '@dispatch';
import { AppState } from '@reducers/index';
import React from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { Helmet } from 'react-helmet';
import UserDataTable from '@components/DataTables/User';
import { getUsers, setUsers } from '@actions';
import { useEffect } from 'react';
import Spinner from '@components/UI/Spinner/Spinner';
import { User } from 'src/redux/types/user';

const reduxProps = createSelector(
  (state: AppState) => state.auth.role,
  (state: AppState) => state.user.users,
  (state: AppState) => state.user.loading,
  (role, users, loading) => ({ role, users, loading })
);

const AllUsers = () => {
  const { role, users, loading } = useSelector(reduxProps);
  const dispatch = useThunkDispatch();

  useEffect(() => {
    dispatch(getUsers('all'));

    return () => {
      dispatch(setUsers(undefined));
    };
  }, [dispatch]);

  if(loading) return <Spinner />

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
            <h2 className="title">All Users</h2>
          </div>
          <UserDataTable role={role as string} users={users as User[]} />
        </div>
      </div>
    </>
  );
};

export default AllUsers;
