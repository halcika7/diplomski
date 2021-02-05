import { Suspense } from 'react';
import { mount } from 'enzyme';
import Pricing from '@containers/Pricing';
import { Provider } from 'react-redux';
import { store } from '@store';
import { BrowserRouter } from 'react-router-dom';
import { axios } from '@axios';
import moxios from 'moxios';
import { setPaperBindings } from '@actions';

describe('Testing Login index', () => {
  it('should render Login container', async () => {
    moxios.install(axios as any);
    const comp = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={null}>
            <Pricing />
          </Suspense>
        </BrowserRouter>
      </Provider>
    );

    store.dispatch(
      setPaperBindings({
        bindings: [
          {
            _id: '1212',
            available: true,
            from100upTo150: 1,
            from25upTo50: 1,
            from50upTo100: 1,
            name: 'asdad',
            upTo25: 1,
          },
        ],
        papers: [
          {
            _id: 'sdsada',
            available: true,
            blackWhitePrinting: {
              from1000: 1,
              from250upTo500: 1,
              from500upTo1000: 1,
              upTo250: 1,
            },
            colorPrinting: {
              from1000: 1,
              from250upTo500: 1,
              from500upTo1000: 1,
              upTo250: 1,
            },
            name: 'sadkpas',
          },
        ],
      })
    );

    comp.update();

    comp.unmount();
  });
});
