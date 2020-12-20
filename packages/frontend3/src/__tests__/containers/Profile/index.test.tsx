import React, { Suspense } from 'react';
import { mount } from 'enzyme';
import Profile from '@containers/Profile';
import { Provider } from 'react-redux';
import { store } from '@store';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { axios } from '@axios';
import moxios from 'moxios';
import { setUserResponse, setUserData } from '@actions';

describe('Testing Login index', () => {
  it('should render Login container', async () => {
    moxios.install(axios as any);
    const history = createBrowserHistory();
    store.dispatch<any>(
      setUserData({
        email: 'sdsoad',
        facebookLink: 'sodas',
        name: 'asdsad',
        phone: 'asdsa',
        picture: 'sdmasa',
        twitterLink: 'adasdzz',
      })
    );
    const comp = mount(
      <Provider store={store}>
        <Router history={history}>
          <Suspense fallback={null}>
            <Profile />
          </Suspense>
        </Router>
      </Provider>
    );

    store.dispatch<any>(setUserResponse('message', 200));
    store.dispatch<any>(setUserResponse('message', 400));

    comp.unmount();
  });

  it('should render Login container', async () => {
    moxios.install(axios as any);
    const history = createBrowserHistory();
    store.dispatch<any>(
      setUserData({
        email: 'sdsoad',
        facebookLink: 'sodas',
        name: 'asdsad',
        phone: 'asdsa',
        picture: 'sdmasa',
        twitterLink: '',
      })
    );
    const comp = mount(
      <Provider store={store}>
        <Router history={history}>
          <Suspense fallback={null}>
            <Profile />
          </Suspense>
        </Router>
      </Provider>
    );

    comp.unmount();
  });

  it('should render Login container', async () => {
    moxios.install(axios as any);
    const history = createBrowserHistory();
    store.dispatch<any>(
      setUserData({
        email: 'sdsoad',
        facebookLink: '',
        name: 'asdsad',
        phone: 'asdsa',
        picture: 'sdmasa',
        twitterLink: 'asdasd',
      })
    );
    const comp = mount(
      <Provider store={store}>
        <Router history={history}>
          <Suspense fallback={null}>
            <Profile />
          </Suspense>
        </Router>
      </Provider>
    );

    comp.unmount();
  });
});
