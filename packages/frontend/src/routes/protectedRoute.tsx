import React, { FC, Suspense } from 'react';
import { Redirect, Route } from 'react-router';
import Spinner from '@components/UI/Spinner/Spinner';
import { OrderType } from 'src/redux/types/order';
import { UserType } from 'src/redux/types/user';

interface Props {
  role: string;
  allowedRoles: string[] | 'all';
  Component: FC<Record<any, any>>;
  orderType?: OrderType;
  usersType?: UserType;
  title?: string;
}

const ProtectedRoute: FC<Props> = ({
  role,
  allowedRoles,
  Component,
  orderType,
  title,
  usersType,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      role && (allowedRoles === 'all' || allowedRoles.includes(role)) ? (
        <Suspense fallback={<Spinner />}>
          <Component
            {...props}
            role={role}
            orderType={orderType}
            title={title}
            usersType={usersType}
          />
        </Suspense>
      ) : (
        <Redirect to="/404" />
      )
    }
  />
);

export default ProtectedRoute;
