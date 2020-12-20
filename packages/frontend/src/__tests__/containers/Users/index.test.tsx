import { Suspense } from 'react';
import { mount } from 'enzyme';
import Users from '@containers/Users';
import { Provider } from 'react-redux';
import { store } from '@store';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { axios } from '@axios';
import moxios from 'moxios';
import { setUsers } from '@actions';

describe('Testing Login index', () => {
  it('should render Login container', async () => {
    moxios.install(axios as any);
    const history = createBrowserHistory();
    const comp = mount(
      <Provider store={store}>
        <Router history={history}>
          <Suspense fallback={null}>
            <Users usersType="all" />
          </Suspense>
        </Router>
      </Provider>
    );

    store.dispatch(setUsers([]));

    comp.update();

    comp.unmount();
  });

  it('should render Login container', async () => {
    moxios.install(axios as any);
    const history = createBrowserHistory();
    const comp = mount(
      <Provider store={store}>
        <Router history={history}>
          <Suspense fallback={null}>
            <Users />
          </Suspense>
        </Router>
      </Provider>
    );

    store.dispatch(setUsers([]));

    comp.update();

    comp.unmount();
  });
});
