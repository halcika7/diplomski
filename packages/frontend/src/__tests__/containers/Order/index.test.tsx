import { Suspense } from 'react';
import { mount } from 'enzyme';
import Order from '@containers/Order';
import { Provider } from 'react-redux';
import { store } from '@store';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { axios } from '@axios';
import moxios from 'moxios';
import { setOrder, setOrderMessage } from '@actions';
import { act } from 'react-dom/test-utils';

describe('Testing Login index', () => {
  it('should render Login container', async () => {
    moxios.install(axios as any);
    const history = createBrowserHistory();
    const comp = mount(
      <Provider store={store}>
        <Router history={history}>
          <Suspense fallback={null}>
            <Order />
          </Suspense>
        </Router>
      </Provider>
    );

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
            <Order role="worker" />
          </Suspense>
        </Router>
      </Provider>
    );

    store.dispatch(
      setOrder({
        createdAt: new Date(),
        documents: [],
        orderedBy: 'saas',
        orderedFor: 'asddsad',
        status: 'approved',
        totalCost: 0,
        updatedAt: new Date(),
      })
    );

    act(() => {
      comp.update();

      comp.find('button').at(0).simulate('click');
      comp.unmount();
    });
  });

  it('should render Login container', async () => {
    moxios.install(axios as any);
    const history = createBrowserHistory();
    const comp = mount(
      <Provider store={store}>
        <Router history={history}>
          <Suspense fallback={null}>
            <Order role="worker" />
          </Suspense>
        </Router>
      </Provider>
    );

    store.dispatch(
      setOrder({
        createdAt: new Date(),
        documents: [],
        orderedBy: { _id: 'asdfjaod', name: 'kfjodjoifjosd' },
        orderedFor: 'asddsad',
        status: 'finished',
        totalCost: 0,
        updatedAt: new Date(),
      })
    );

    act(() => {
      comp.update();

      comp.find('button').at(0).simulate('click');
      comp.unmount();
    });
  });

  it('should render Login container', async () => {
    moxios.install(axios as any);
    const history = createBrowserHistory();
    const comp = mount(
      <Provider store={store}>
        <Router history={history}>
          <Suspense fallback={null}>
            <Order role="administration" />
          </Suspense>
        </Router>
      </Provider>
    );

    store.dispatch(
      setOrder({
        createdAt: new Date(),
        documents: [],
        orderedBy: 'saas',
        orderedFor: 'asddsad',
        status: 'pending',
        totalCost: 0,
        updatedAt: new Date(),
      })
    );

    store.dispatch(setOrderMessage('suhiasds', 200));
    store.dispatch(setOrderMessage('suhiasds', 400));

    act(() => {
      comp.update();

      comp.find('button').at(0).simulate('click');
      comp.unmount();
    });
  });

  it('should render Login container', async () => {
    moxios.install(axios as any);
    const history = createBrowserHistory();
    const comp = mount(
      <Provider store={store}>
        <Router history={history}>
          <Suspense fallback={null}>
            <Order role="administration" />
          </Suspense>
        </Router>
      </Provider>
    );

    store.dispatch(setOrderMessage('suhiasds', 200));
    store.dispatch(setOrderMessage('suhiasds', 400));

    comp.update();

    comp.unmount();
  });
});
