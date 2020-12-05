import { useThunkDispatch } from '@dispatch';
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { getBindings } from '@actions';
import { createSelector } from 'reselect';
import { AppState } from '@reducers/index';
import { useSelector } from 'react-redux';
import BindingTable from '@components/DataTables/Binding';

const reduxProps = createSelector(
  (state: AppState) => state.paperBinding.bindings,
  (bindings) => ({ bindings })
);

const Bindings = () => {
  const dispatch = useThunkDispatch();
  const { bindings } = useSelector(reduxProps);

  useEffect(() => {
    dispatch(getBindings);
  }, [dispatch]);

  return (
    <>
      <Helmet>
        <title>Binding Table</title>
        <meta
          name="description"
          content="Binding Table page in Print shop app"
        />
        <meta
          property="og:description"
          content="Binding Table page in Print shop app"
        />
      </Helmet>
      <div className="row">
        <div className="col-12 card">
          <div className="card-header">
            <h2 className="title">Binding prices</h2>
          </div>
          <BindingTable bindings={bindings} />
        </div>
      </div>
    </>
  );
};

export default Bindings;
