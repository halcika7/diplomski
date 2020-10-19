import { useThunkDispatch } from '@dispatch';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { createSelector } from 'reselect';
import { AppState } from '@reducers/index';
import { useSelector } from 'react-redux';
import { getPapers } from '@actions';
import PapersTable from '@components/DataTables/Paper';

const reduxProps = createSelector(
  (state: AppState) => state.auth.role,
  (state: AppState) => state.paperBinding.papers,
  (role, papers) => ({ role, papers })
);

const Papers = () => {
  const dispatch = useThunkDispatch();

  const { role, papers } = useSelector(reduxProps);

  useEffect(() => {
    dispatch(getPapers);
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Price Table</title>
        <meta name="description" content="Price Table page in Print shop app" />
        <meta
          property="og:description"
          content="Price Table page in Print shop app"
        />
      </Helmet>
      <div className="row">
        <div className="col-12 card">
          <div className="card-header">
            <h2 className="title">Paper prices</h2>
          </div>
          <PapersTable role={role as string} papers={papers} />
        </div>
      </div>
    </>
  );
};

export default Papers;
