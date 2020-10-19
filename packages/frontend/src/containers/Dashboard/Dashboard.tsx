import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { AppState } from '../../redux/reducers/index';

// const Admin = React.lazy(() => import('./Admin'));
const Professors = React.lazy(() => import('./Professors'));
const Administration = React.lazy(() => import('./Administration'));

const reduxProps = createSelector(
  (state: AppState) => state.auth.role,
  role => ({ role })
);

const Dashboard = () => {
  const { role } = useSelector(reduxProps);

  useEffect(() => {}, []);

  return (
    <div className="row">
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="Dashboard page in Print shop app" />
        <meta
          property="og:description"
          content="Dashboard page in Print shop app"
        />
      </Helmet>
      {role === 'professor' && <Professors />}
      {role === 'administration' && <Administration />}
    </div>
  );
};

// {role === 'admin' && <Admin />}

export default React.memo(Dashboard);
