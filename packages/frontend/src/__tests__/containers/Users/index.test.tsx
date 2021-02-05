import { Suspense } from 'react';
import { mount } from 'enzyme';
import Users from '@containers/Users';
import { Provider } from 'react-redux';
import { store } from '@store';
import { BrowserRouter } from 'react-router-dom';
import { axios } from '@axios';
import moxios from 'moxios';
import { setUsers } from '@actions';

describe('Testing Login index', () => {
  it('should render Login container', async () => {
    moxios.install(axios as any);

    const comp = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={null}>
            <Users usersType="all" />
          </Suspense>
        </BrowserRouter>
      </Provider>
    );

    store.dispatch(setUsers([]));

    comp.update();

    comp.unmount();
  });

  it('should render Login container', async () => {
    moxios.install(axios as any);

    const comp = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={null}>
            <Users />
          </Suspense>
        </BrowserRouter>
      </Provider>
    );

    store.dispatch(setUsers([]));

    comp.update();

    comp.unmount();
  });
});
