import React, { Suspense } from 'react';
import { mount } from 'enzyme';
import Files from '@containers/Files';
import { Provider } from 'react-redux';
import { store } from '@store';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { axios } from '@axios';
import moxios from 'moxios';
import { setFiles } from '@actions';

describe('Testing Login index', () => {
  it('should render Login container', async () => {
    moxios.install(axios as any);
    const history = createBrowserHistory();
    const comp = mount(
      <Provider store={store}>
        <Router history={history}>
          <Suspense fallback={null}>
            <Files />
          </Suspense>
        </Router>
      </Provider>
    );

    store.dispatch(setFiles([]));

    comp.update();

    comp.unmount();
  });
});
