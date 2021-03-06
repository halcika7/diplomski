import { Suspense } from 'react';
import { mount } from 'enzyme';
import Files from '@containers/Files';
import { Provider } from 'react-redux';
import { store } from '@store';
import { BrowserRouter } from 'react-router-dom';
import { axios } from '@axios';
import moxios from 'moxios';
import { setFiles } from '@actions';

describe('Testing Login index', () => {
  it('should render Login container', async () => {
    moxios.install(axios as any);
    const comp = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={null}>
            <Files />
          </Suspense>
        </BrowserRouter>
      </Provider>
    );

    store.dispatch(setFiles([]));

    comp.update();

    comp.unmount();
  });
});
