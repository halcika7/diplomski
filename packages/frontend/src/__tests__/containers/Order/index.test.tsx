import { Suspense } from 'react';
import { mount } from 'enzyme';
import Order from '@containers/Order';
import { Provider } from 'react-redux';
import { store } from '@store';
import { BrowserRouter } from 'react-router-dom';
import { axios } from '@axios';
import moxios from 'moxios';
import { setOrder, setOrderMessage } from '@actions';
import { act } from 'react-dom/test-utils';

describe('Testing Login index', () => {
  it('should render Login container', async () => {
    moxios.install(axios as any);

    const comp = mount(
      <Provider store={store}>
        <BrowserRouter history={history as any}>
          <Suspense fallback={null}>
            <Order />
          </Suspense>
        </BrowserRouter>
      </Provider>
    );

    comp.update();

    comp.unmount();
  });

  it('should render Login container', async () => {
    moxios.install(axios as any);

    const comp = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={null}>
            <Order role="worker" />
          </Suspense>
        </BrowserRouter>
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

    const comp = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={null}>
            <Order role="worker" />
          </Suspense>
        </BrowserRouter>
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

    const comp = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={null}>
            <Order role="administration" />
          </Suspense>
        </BrowserRouter>
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

    const comp = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={null}>
            <Order role="administration" />
          </Suspense>
        </BrowserRouter>
      </Provider>
    );

    store.dispatch(setOrderMessage('suhiasds', 200));
    store.dispatch(setOrderMessage('suhiasds', 400));

    comp.update();

    comp.unmount();
  });
});
