import { createSelector } from 'reselect';
import { AppState } from '@reducers/index';
import { useSelector } from 'react-redux';
import GraphEarningByMonths from './GraphByMonths';
import GraphEarningByMonth from './GraphByMonth';
import {
  updateChartEarningByMonths,
  updateChartEarningByMonth,
  updateChartOrdersByMonths,
  updateChartOrdersByMonth,
} from '@actions';
import { useThunkDispatch } from '@dispatch';
import OrderGraphByMonths from './OrderGraphByMonths';
import { FilterOrders } from '@job/common';

const redux = createSelector(
  (state: AppState) => state.dashboard.earningsByMonth,
  (state: AppState) => state.dashboard.earningsForMonth,
  (state: AppState) => state.dashboard.ordersByMonths,
  (state: AppState) => state.dashboard.ordersByMonth,
  (earningsByMonth, earningsForMonth, ordersByMonths, ordersByMonth) => ({
    earningsByMonth,
    earningsForMonth,
    ordersByMonths,
    ordersByMonth,
  })
);

const Graphs = () => {
  const {
    earningsByMonth,
    earningsForMonth,
    ordersByMonths,
    ordersByMonth,
  } = useSelector(redux);
  const dispatch = useThunkDispatch();

  const updateEarningByMonths = (year: number, body: FilterOrders) => {
    dispatch(updateChartEarningByMonths(year, body));
  };

  const updateEarningByMonth = (
    year: number,
    month: number,
    body: FilterOrders
  ) => {
    dispatch(updateChartEarningByMonth(year, month, body));
  };

  const updateOrdersByMonths = (year: number, body: FilterOrders) => {
    dispatch(updateChartOrdersByMonths(year, body));
  };

  const updateOrdersByMonth = (
    year: number,
    month: number,
    body: FilterOrders
  ) => {
    dispatch(updateChartOrdersByMonth(year, month, body));
  };

  return (
    <div className="col-12">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <h2 className="mt-2 mb-2 ml-3">Earnings & Debt Graphs</h2>
          </div>
        </div>
        <GraphEarningByMonths
          update={updateEarningByMonths}
          data={earningsByMonth}
        />
        <GraphEarningByMonth
          update={updateEarningByMonth}
          data={earningsForMonth}
        />
        <div className="col-12">
          <div className="card">
            <h2 className="mt-2 mb-2 ml-3">Order Graphs</h2>
          </div>
        </div>
        <OrderGraphByMonths
          data={ordersByMonths}
          update={updateOrdersByMonths}
        />
        <GraphEarningByMonth
          update={updateOrdersByMonth}
          data={ordersByMonth}
        />
      </div>
    </div>
  );
};

export default Graphs;
