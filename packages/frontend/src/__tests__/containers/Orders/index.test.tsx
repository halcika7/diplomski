import { Suspense } from 'react';
import { mount } from 'enzyme';
import Orders from '@containers/Orders';
import { Provider } from 'react-redux';
import { store } from '@store';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { axios } from '@axios';
import moxios from 'moxios';
import { setOrderMessage, setOrders, setIsOrderStatusChanging } from '@actions';
import { act } from 'react-dom/test-utils';

describe('Testing Login index', () => {
  it('should render Login container', async () => {
    moxios.install(axios as any);
    const history = createBrowserHistory();
    const comp = mount(
      <Provider store={store}>
        <Router history={history}>
          <Suspense fallback={null}>
            <Orders role="worker" />
          </Suspense>
        </Router>
      </Provider>
    );

    comp.unmount();
  });

  it('should render Login container', async () => {
    moxios.install(axios as any);
    const history = createBrowserHistory();
    store.dispatch(
      setOrders([
        {
          _id: 'sdasdsa',
          createdAt: 'new Date()',
          orderedFor: 'sadjaspod',
          status: 'approved',
          totalCost: 1,
        },
      ])
    );
    const comp = mount(
      <Provider store={store}>
        <Router history={history}>
          <Suspense fallback={null}>
            <Orders orderType="all" role="worker" />
          </Suspense>
        </Router>
      </Provider>
    );

    act(() => {
      comp.update();

      comp.find('button').at(4).simulate('click');

      comp.unmount();
    });
  });

  it('should render Login container', async () => {
    moxios.install(axios as any);
    const history = createBrowserHistory();
    store.dispatch(
      setOrders([
        {
          _id: 'sdasdsa',
          createdAt: 'new Date()',
          orderedFor: 'sadjaspod',
          status: 'approved',
          totalCost: 1,
        },
      ])
    );
    store.dispatch<any>(setOrderMessage('sfds', 400));
    store.dispatch(setIsOrderStatusChanging(true));
    const comp = mount(
      <Provider store={store}>
        <Router history={history}>
          <Suspense fallback={null}>
            <Orders orderType="all" role="worker" />
          </Suspense>
        </Router>
      </Provider>
    );

    act(() => {
      comp.update();

      comp.find('button').at(4).simulate('click');
      comp.unmount();
    });
  });

  it('should render Login container', async () => {
    moxios.install(axios as any);
    const history = createBrowserHistory();
    store.dispatch(
      setOrders([
        {
          _id: 'sdasdsa',
          createdAt: 'new Date()',
          orderedFor: 'sadjaspod',
          status: 'approved',
          totalCost: 1,
        },
      ])
    );
    store.dispatch<any>(setOrderMessage('sfds', 200));
    const comp = mount(
      <Provider store={store}>
        <Router history={history}>
          <Suspense fallback={null}>
            <Orders orderType="all" role="worker" />
          </Suspense>
        </Router>
      </Provider>
    );

    comp.unmount();
  });
});
