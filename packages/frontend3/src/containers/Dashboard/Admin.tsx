import React from 'react';
import { createSelector } from 'reselect';
import { AppState } from '@reducers/index';
import { useSelector } from 'react-redux';
import {
  earnings,
  orders,
  earningsMonth,
  monthOrders,
} from './ts-files/adminColumns';
import StatsSuspense from '@components/UI/Stats/StatsSuspense';

const StatsPercentageSuspense = React.lazy(
  () => import('../../components/UI/Stats/StatsPercentageSuspense')
);
const Stats = React.lazy(() => import('../../components/UI/Stats/Stats'));
const StatsWithPercentage = React.lazy(
  () => import('../../components/UI/Stats/StatsWithPercentage')
);

const redux = createSelector(
  (state: AppState) => state.dashboard,
  dashboard => ({ dashboard })
);

const Admin = () => {
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
        {earningsMonth.map(({ name, heading, heading2 }) => (
          <StatsPercentageSuspense key={name}>
            <StatsWithPercentage
              value={dashboard[name]?.thisMonthEarnings}
              oldValue={dashboard[name]?.lastMonthEarnings}
              heading={heading}
              heading2={heading2}
              icon="money-wave"
              price
            />
          </StatsPercentageSuspense>
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
        {monthOrders.map(({ name, heading, heading2, icon }) => (
          <StatsPercentageSuspense key={name}>
            <StatsWithPercentage
              value={dashboard[name]?.thisMonthOrders}
              oldValue={dashboard[name]?.lastMonthOrders}
              heading={heading}
              heading2={heading2}
              icon={icon}
            />
          </StatsPercentageSuspense>
        ))}
      </div>
    </div>
  );
};

export default React.memo(Admin);
