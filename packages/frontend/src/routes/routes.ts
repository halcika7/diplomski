import { FC, lazy } from 'react';

type Route = {
  path: string;
  exact: boolean;
  Component: FC<Record<any, any>>;
};

export const publicRoutes: Route[] = [
  {
    path: '/',
    exact: true,
    Component: lazy(() => import('../containers/Login')),
  },
];

export const authenticatedRoutes: Route[] = [
  {
    path: '/dashboard',
    exact: true,
    Component: lazy(() => import('../containers/Dashboard/Dashboard')),
  },
  {
    path: '/pricing',
    exact: true,
    Component: lazy(() => import('../containers/Pricing')),
  },
  {
    path: '/profile',
    exact: true,
    Component: lazy(() => import('../containers/Profile')),
  },
  {
    path: '/all-orders',
    exact: true,
    Component: lazy(() => import('../containers/DataTables/OrdersDataTable')),
  },
  {
    path: '/completed-orders',
    exact: true,
    Component: lazy(() => import('../containers/DataTables/OrdersDataTable')),
  },
  {
    path: '/rejected-orders',
    exact: true,
    Component: lazy(() => import('../containers/DataTables/OrdersDataTable')),
  },
  {
    path: '/pending-orders',
    exact: true,
    Component: lazy(() => import('../containers/DataTables/OrdersDataTable')),
  },
  {
    path: '/paid-orders',
    exact: true,
    Component: lazy(() => import('../containers/DataTables/OrdersDataTable')),
  },
  {
    path: '/unpaid-orders',
    exact: true,
    Component: lazy(() => import('../containers/DataTables/OrdersDataTable')),
  },
  {
    path: '/order/:id',
    exact: true,
    Component: lazy(() => import('../containers/Order')),
  },
];

export const adminRoutes: Route[] = [
  {
    path: '/deleted-orders',
    exact: true,
    Component: lazy(() => import('../containers/DataTables/OrdersDataTable')),
  },
  {
    path: '/edit-user/:id',
    exact: true,
    Component: lazy(() => import('../containers/EditUser')),
  },
];

export const adminWorkerRoutes: Route[] = [
  {
    path: '/employees',
    exact: true,
    Component: lazy(() => import('../containers/Users/Employee')),
  },
  {
    path: '/professors',
    exact: true,
    Component: lazy(() => import('../containers/Users/Professor')),
  },
  {
    path: '/administration',
    exact: true,
    Component: lazy(() => import('../containers/Users/Administration')),
  },
  {
    path: '/admins',
    exact: true,
    Component: lazy(() => import('../containers/Users/Admin')),
  },
  {
    path: '/users',
    exact: true,
    Component: lazy(() => import('../containers/Users/All')),
  },
  {
    path: '/papers',
    exact: true,
    Component: lazy(() => import('../containers/AdminPricing/Papers')),
  },
  {
    path: '/bindings',
    exact: true,
    Component: lazy(() => import('../containers/AdminPricing/Bindings')),
  },
  {
    path: '/files',
    exact: true,
    Component: lazy(() => import('../containers/Files')),
  },
  {
    path: '/new-orders',
    exact: true,
    Component: lazy(() => import('../containers/DataTables/OrdersDataTable')),
  },
];

export const professorRoutes: Route[] = [
  {
    path: '/add-order',
    exact: true,
    Component: lazy(() => import('../containers/AddOrder')),
  },
];
