import { Suspense } from 'react';
import { mount } from 'enzyme';
import Bindings from '@containers/AdminPricing/Bindings';
import { Provider } from 'react-redux';
import { store } from '@store';
import { BrowserRouter } from 'react-router-dom';
import { axios } from '@axios';
import moxios from 'moxios';

describe('Testing Login index', () => {
  it('should render Login container', async () => {
    moxios.install(axios as any);
    const comp = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={null}>
            <Bindings />
          </Suspense>
        </BrowserRouter>
      </Provider>
    );

    comp.update();

    comp.unmount();
  });
});
