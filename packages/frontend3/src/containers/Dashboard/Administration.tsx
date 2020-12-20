import React from 'react';
import { createSelector } from 'reselect';
import { AppState } from '@reducers/index';
import { useSelector } from 'react-redux';
import { earnings, orders } from './ts-files/administrationColumns';
import StatsSuspense from '@components/UI/Stats/StatsSuspense';

const Stats = React.lazy(() => import('../../components/UI/Stats/Stats'));

const redux = createSelector(
  (state: AppState) => state.dashboard,
  dashboard => ({ dashboard })
);

const Administration = () => {
  const { dashboard } = useSelector(redux);
  return (
    <div className="col-12">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <h2 className="mt-2 mb-2 ml-3">Earnings & Debt</h2>
          </div>
        </div>
        {earnings.map(row => (
          <StatsSuspense classes="col-6 col-xl-3" key={row.name}>
            <Stats
              value={dashboard[row.name] + ' KM'}
              heading={row.heading}
              icon="money-wave"
            />
          </StatsSuspense>
        ))}
        <div className="col-12">
          <div className="card">
            <h2 className="mt-2 mb-2 ml-3">Orders</h2>
          </div>
        </div>
        {orders.map(order => (
          <StatsSuspense classes="col-6 col-xl-3" key={order.name}>
            <Stats
              value={dashboard[order.name]}
              heading={order.heading}
              icon="box"
            />
          </StatsSuspense>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Administration);
