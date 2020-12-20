import React, { Suspense } from 'react';
import { mount } from 'enzyme';
import AddOrder from '@containers/AddOrder';
import { Provider } from 'react-redux';
import { store } from '@store';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { axios } from '@axios';
import moxios from 'moxios';

describe('Testing Login index', () => {
  it('should render Login container', async () => {
    moxios.install(axios as any);
    const history = createBrowserHistory();
    const comp = mount(
      <Provider store={store}>
        <Router history={history}>
          <Suspense fallback={null}>
            <AddOrder />
          </Suspense>
        </Router>
      </Provider>
    );

    comp.update();

    comp.unmount();
  });
});
