import { axios } from '@axios';
import { DashboardState } from '@reducers/dashboard';
import { AppThunkDispatch } from '../AppThunkDispatch';
import { DashboardActions } from '../types/dashboard';
import { FilterOrders, OrdersByMonths, OrderCostMonth } from '@job/common';

export const getDashboard = (role: string) => async (
  dispatch: AppThunkDispatch
) => {
  const { data } = await axios.get<Partial<DashboardState>>(
    `/dashboard/${role}`
  );
  dispatch({
    type: DashboardActions.SET_DASHBOARD,
    payload: { ...data },
  });
};

export const updateChartEarningByMonths = (
  year: number,
  body: FilterOrders
) => async (dispatch: AppThunkDispatch) => {
  const { data } = await axios.get<{ earningsByMonth: OrderCostMonth[] }>(
    `/dashboard/chart/earning/${year}`,
    { params: body }
  );
  dispatch({
    type: DashboardActions.SET_DASHBOARD,
    payload: { ...data },
  });
};

export const updateChartEarningByMonth = (
  year: number,
  month: number,
  body: FilterOrders
) => async (dispatch: AppThunkDispatch) => {
  const { data } = await axios.get<{ earningsForMonth: OrderCostMonth[] }>(
    `/dashboard/chart/earning/day/${year}/${month}`,
    { params: body }
  );
  dispatch({
    type: DashboardActions.SET_DASHBOARD,
    payload: { ...data },
  });
};

export const updateChartOrdersByMonths = (
  year: number,
  body: FilterOrders
) => async (dispatch: AppThunkDispatch) => {
  const { data } = await axios.get<{ ordersByMonths: OrdersByMonths[] }>(
    `/dashboard/chart/order/${year}`,
    { params: body }
  );
  dispatch({
    type: DashboardActions.SET_DASHBOARD,
    payload: { ...data },
  });
};

export const updateChartOrdersByMonth = (
  year: number,
  month: number,
  body: FilterOrders
) => async (dispatch: AppThunkDispatch) => {
  const { data } = await axios.get<{
    ordersByMonth: { x: number; y: number }[];
  }>(`/dashboard/chart/order/day/${year}/${month}`, { params: body });
  dispatch({
    type: DashboardActions.SET_DASHBOARD,
    payload: { ...data },
  });
};
