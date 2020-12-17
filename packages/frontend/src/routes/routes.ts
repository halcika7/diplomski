import { FC, lazy } from 'react';
import { UserRole, OrderType, AnyDictionary } from '@job/common';

type Route = {
  path: string;
  exact: boolean;
  Component: FC<AnyDictionary>;
  orderType?: OrderType;
  usersType?: UserRole | 'all';
  title?: string;
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
    orderType: 'all',
    exact: true,
    Component: lazy(() => import('../containers/Orders')),
  },
  {
    path: '/completed-orders',
    exact: true,
    orderType: 'completed',
    Component: lazy(() => import('../containers/Orders')),
  },
  {
    path: '/rejected-orders',
    exact: true,
    orderType: 'rejected',
    Component: lazy(() => import('../containers/Orders')),
  },
  {
    path: '/pending-orders',
    exact: true,
    orderType: 'pending',
    Component: lazy(() => import('../containers/Orders')),
  },
  {
    path: '/unpaid-orders',
    orderType: 'finished',
    exact: true,
    Component: lazy(() => import('../containers/Orders')),
  },
  {
    path: '/order/:id',
    exact: true,
    Component: lazy(() => import('../containers/Order')),
  },
];

export const adminWorkerRoutes: Route[] = [
  {
    path: '/employees',
    exact: true,
    usersType: 'worker',
    title: 'Employees',
    Component: lazy(() => import('../containers/Users')),
  },
  {
    path: '/professors',
    exact: true,
    usersType: 'professor',
    title: 'Professors',
    Component: lazy(() => import('../containers/Users')),
  },
  {
    path: '/administration',
    exact: true,
    usersType: 'administration',
    title: 'Administration',
    Component: lazy(() => import('../containers/Users')),
  },
  {
    path: '/admins',
    exact: true,
    usersType: 'admin',
    title: 'Admins',
    Component: lazy(() => import('../containers/Users')),
  },
  {
    path: '/users',
    exact: true,
    usersType: 'all',
    title: 'All Users',
    Component: lazy(() => import('../containers/Users')),
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
    orderType: 'approved',
    Component: lazy(() => import('../containers/Orders')),
  },
  {
    path: '/user/:id',
    exact: true,
    Component: lazy(() => import('../containers/EditUser')),
  },
  {
    path: '/add-binding',
    exact: true,
    Component: lazy(() => import('../containers/AdminPricing/AddBinding')),
  },
  {
    path: '/add-paper',
    exact: true,
    Component: lazy(() => import('../containers/AdminPricing/AddPaper')),
  },
];

export const adminRoutes: Route[] = [
  {
    path: '/add-user',
    exact: true,
    Component: lazy(() => import('../containers/AddUser')),
  },
];

export const professorRoutes: Route[] = [
  {
    path: '/add-order',
    exact: true,
    Component: lazy(() => import('../containers/AddOrder')),
  },
];
