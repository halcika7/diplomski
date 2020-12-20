import { FC, Suspense } from 'react';
import { Redirect, Route } from 'react-router';
import Spinner from '@components/UI/Spinner/Spinner';
import { UserRole, OrderType, AnyDictionary } from '@job/common';

interface Props {
  role: string;
  allowedRoles: string[] | 'all';
  Component: FC<AnyDictionary>;
  orderType?: OrderType;
  usersType?: UserRole | 'all';
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
    render={
      props =>
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
      // eslint-disable-next-line react/jsx-curly-newline
    }
  />
);

export default ProtectedRoute;
