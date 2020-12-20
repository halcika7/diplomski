import React, { useState, FC } from 'react';
import { createSelector } from 'reselect';
import { AppState } from '@reducers';
import { useSelector } from 'react-redux';
import Select from '@components/UI/Select';
import { OrdersByMonths, FilterOrders } from '@job/common';
import { getYears, statuses, orderedFor } from './ts-files/chart';

const GraphSuspense = React.lazy(
  () => import('../../components/UI/Orders/GraphSuspense')
);
const OrdersYearByMonth = React.lazy(
  () => import('../../components/UI/Orders/OrdersYearByMonth')
);

const redux = createSelector(
  (state: AppState) => state.auth.role,
  (state: AppState) => state.auth.year,
  (role, year) => ({ role, year })
);

interface Props {
  update: (year: number, body: FilterOrders) => void;
  data: OrdersByMonths[] | null;
}

const OrderGraphByMonths: FC<Props> = ({ update, data }) => {
  const { role, year } = useSelector(redux);
  const years = getYears(role === 'professor' ? (year as number) : 2019);
  const [selectedYear, setSelectedYear] = useState<number>(
    new Date().getFullYear()
  );
  const [status, setStatus] = useState<string>('All');
  const [orderFor, setOrderFor] = useState<string>(
    role === 'administration' ? 'University' : 'All'
  );

  const onClick = () => {
    const data = {
      status: status === 'All' ? null : status.toLowerCase(),
      orderedFor: orderFor === 'All' ? null : orderFor,
    };
    update(selectedYear, data);
  };

  return (
    <div className="col-12 col-sm-6">
      <div className="card">
        <div className="row p-3">
          <div className="col-md-6 col-xl-4 mb-3">
            <Select
              label="Select Year"
              value={selectedYear}
              change={setSelectedYear}
              values={years}
            />
          </div>
          <div className="col-md-6 col-xl-4 mb-3">
            <Select
              label="Select Order Status"
              value={status}
              change={setStatus}
              values={statuses}
            />
          </div>
          {role !== 'administration' && (
            <div className="col-md-6 col-xl-4 mb-3">
              <Select
                label="Select Order Type"
                value={orderFor}
                change={setOrderFor}
                valuesWithoutMap={orderedFor}
              />
            </div>
          )}
          <div className="col-12">
            <button
              className="btn btn-sm btn-primary"
              type="button"
              onClick={onClick}
            >
              Update
            </button>
          </div>
        </div>
        <GraphSuspense>
          <OrdersYearByMonth data={data} loading={!data} title="" />
        </GraphSuspense>
      </div>
    </div>
  );
};

export default OrderGraphByMonths;
