import { Suspense } from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { createSelector } from 'reselect';
import {
  publicRoutes,
  authenticatedRoutes,
  adminWorkerRoutes,
  professorRoutes,
  adminRoutes,
} from './routes';
import { AppState } from '@reducers/index';
import { useSelector } from 'react-redux';
import Spinner from '@components/UI/Spinner/Spinner';
import ProtectedRoute from './protectedRoute';
import Navbar from '@components/Navbar';
import Footer from '@components/Footer';
import Sidebar from '@components/Sidebar';
import PageNotFound from '../containers/PageNotFound';

const reduxProps = createSelector(
  (state: AppState) => state.auth.role,
  (state: AppState) => state.auth.authLoading,
  (role, loading) => ({ role, loading })
);

const Routes = () => {
  const { role, loading } = useSelector(reduxProps);

  if (loading) return <Spinner />;

  return (
    <Switch>
      {publicRoutes.map(({ Component, path, exact }) => (
        <Route
          key={path}
          path={path}
          exact={exact}
          render={props => (
            <Suspense fallback={<Spinner />}>
              <Component {...props} />
            </Suspense>
          )}
        />
      ))}
      {role && (
        <Route
          exact
          render={() => (
            <>
              <Sidebar role={role as string} />
              <div className="main-panel">
                <Navbar role={role as string} />
                <div className="content">
                  <Switch>
                    {authenticatedRoutes.map(route => (
                      <ProtectedRoute
                        key={route.path}
                        allowedRoles="all"
                        {...route}
                        role={role as string}
                      />
                    ))}
                    {professorRoutes.map(route => (
                      <ProtectedRoute
                        key={route.path}
                        allowedRoles={['professor']}
                        {...route}
                        role={role as string}
                      />
                    ))}
                    {adminWorkerRoutes.map(route => (
                      <ProtectedRoute
                        key={route.path}
                        allowedRoles={['worker', 'admin']}
                        {...route}
                        role={role as string}
                      />
                    ))}
                    {adminRoutes.map(route => (
                      <ProtectedRoute
                        key={route.path}
                        allowedRoles={['admin']}
                        {...route}
                        role={role as string}
                      />
                    ))}
                    <Route exact path="/404" render={() => <PageNotFound />} />
                    <Route exact path="*" component={PageNotFound} />
                  </Switch>
                </div>
                <Footer />
              </div>
            </>
          )}
        />
      )}
      <Route exact path="*" render={() => <Redirect to="/" />} />
    </Switch>
  );
};

export default Routes;
