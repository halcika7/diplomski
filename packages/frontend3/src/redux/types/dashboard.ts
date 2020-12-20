import { DashboardState } from '../reducers/dashboard';

export enum DashboardActions {
  SET_DASHBOARD = 'SET_DASHBOARD',
}

interface SetDashboard {
  type: typeof DashboardActions.SET_DASHBOARD;
  payload: Partial<DashboardState>;
}

export type DashboardActionTypes = SetDashboard;
