import { useThunkDispatch } from '@dispatch';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { AppState } from '@reducers/index';
import { getDashboard } from '@actions';

import Admin from './Admin';
import Professors from './Professors';
import Administration from './Administration';
import Graphs from './Graphs';

const reduxProps = createSelector(
  (state: AppState) => state.auth.role,
  role => ({ role })
);

const Dashboard = () => {
  const { role } = useSelector(reduxProps);
  const dispatch = useThunkDispatch();

  useEffect(() => {
    if (role) {
      dispatch(getDashboard(role as string));
    }
  }, [dispatch, role]);

  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard page in Print shop app" />
        <meta
          property="og:description"
          content="Dashboard page in Print shop app"
        />
      </Helmet>
      <div className="row">
        {role === 'professor' && <Professors />}
        {role === 'administration' && <Administration />}
        {(role === 'admin' || role === 'worker') && <Admin />}

        <Graphs />
      </div>
    </>
  );
};

export default React.memo(Dashboard);
