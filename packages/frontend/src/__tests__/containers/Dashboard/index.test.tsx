import React, { Suspense } from 'react';
import { mount } from 'enzyme';
import Dashboard from '@containers/Dashboard/Dashboard';
import { Provider } from 'react-redux';
import { store } from '@store';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { axios } from '@axios';
import moxios from 'moxios';
import { authSuccess, getDashboard } from '@actions';

describe('Testing Login index', () => {
  it('should render Login container', async () => {
    moxios.install(axios as any);
    const history = createBrowserHistory();
    store.dispatch(
      authSuccess(
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MDgzMDkzMzAsImV4cCI6MTYzOTg0NTMzMCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiIiwicm9sZSI6ImFkbWluIn0.OlIaqIjlM-Dls2egQnpMqOiPHk0kov-5Oms7Rsi4bVM'
      )
    );
    const comp = mount(
      <Provider store={store}>
        <Router history={history}>
          <Suspense fallback={null}>
            <Dashboard />
          </Suspense>
        </Router>
      </Provider>
    );

    comp.find('button').at(0).simulate('click');
    comp.find('button').at(1).simulate('click');
    comp.find('button').at(2).simulate('click');
    comp.find('button').at(3).simulate('click');

    store.dispatch<any>(getDashboard('admin'));

    comp.update();

    comp.unmount();
  });

  it('should render Login container', async () => {
    moxios.install(axios as any);
    const history = createBrowserHistory();
    store.dispatch(
      authSuccess(
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MDgzMDkzMzAsImV4cCI6MTYzOTg0NTMzMCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiIiwicm9sZSI6IndvcmtlciJ9.DCcNBqavBBit7A8tuJCnKWFkxKShyaoyu5SQseWWy7o'
      )
    );
    const comp = mount(
      <Provider store={store}>
        <Router history={history}>
          <Suspense fallback={null}>
            <Dashboard />
          </Suspense>
        </Router>
      </Provider>
    );

    comp.find('button').at(0).simulate('click');
    comp.find('button').at(1).simulate('click');
    comp.find('button').at(2).simulate('click');
    comp.find('button').at(3).simulate('click');

    store.dispatch<any>(getDashboard('admin'));

    comp.update();

    comp.unmount();
  });

  it('should render Login container', async () => {
    moxios.install(axios as any);
    const history = createBrowserHistory();

    store.dispatch(
      authSuccess(
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MDgzMDkzMzAsImV4cCI6MTYzOTg0NTMzMCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiIiwicm9sZSI6InByb2Zlc3NvciJ9.kcX-DbMsLNXD8EBlkHqiRwi0K27NoP21fshLsE40ZKA'
      )
    );
    const comp = mount(
      <Provider store={store}>
        <Router history={history}>
          <Suspense fallback={null}>
            <Dashboard />
          </Suspense>
        </Router>
      </Provider>
    );

    store.dispatch<any>(getDashboard('admin'));

    comp.find('button').at(0).simulate('click');
    comp.find('button').at(1).simulate('click');
    comp.find('button').at(2).simulate('click');
    comp.find('button').at(3).simulate('click');

    comp.update();

    comp.unmount();
  });

  it('should render Login container', async () => {
    moxios.install(axios as any);
    const history = createBrowserHistory();
    store.dispatch(
      authSuccess(
        'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE2MDgzMDkzMzAsImV4cCI6MTYzOTg0NTMzMCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoiIiwicm9sZSI6ImFkbWluaXN0cmF0aW9uIn0.NNHap6Y9oWv9OYuBOnKKVpVgSR2DEORfWnuY_EoSIH4'
      )
    );
    const comp = mount(
      <Provider store={store}>
        <Router history={history}>
          <Suspense fallback={null}>
            <Dashboard />
          </Suspense>
        </Router>
      </Provider>
    );

    store.dispatch<any>(getDashboard('admin'));

    comp.find('button').at(0).simulate('click');
    comp.find('button').at(1).simulate('click');
    comp.find('button').at(2).simulate('click');
    comp.find('button').at(3).simulate('click');

    comp.update();

    comp.unmount();
  });

  it('should render Login container', async () => {
    moxios.install(axios as any);
    const history = createBrowserHistory();
    store.dispatch(authSuccess(''));
    const comp = mount(
      <Provider store={store}>
        <Router history={history}>
          <Suspense fallback={null}>
            <Dashboard />
          </Suspense>
        </Router>
      </Provider>
    );

    store.dispatch<any>(getDashboard('admin'));

    comp.update();

    comp.unmount();
  });
});
