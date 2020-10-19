import React, { FC, Suspense } from 'react';
import { Redirect, Route } from 'react-router';
import Spinner from '@components/UI/Spinner/Spinner';

interface Props {
  role: string;
  allowedRoles: string[] | 'all';
  Component: FC<Record<any, any>>;
}

const ProtectedRoute: FC<Props> = ({
  role,
  allowedRoles,
  Component,
  ...rest
}) => (
  <Route
    {...rest}
    render={props =>
      role && (allowedRoles === 'all' || allowedRoles.includes(role)) ? (
        <Suspense fallback={<Spinner />}>
          <Component {...props} role={role} />
        </Suspense>
      ) : (
        <Redirect to="/404" />
      )
    }
  />
);

export default ProtectedRoute;
