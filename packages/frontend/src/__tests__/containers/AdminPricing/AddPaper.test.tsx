import { Suspense } from 'react';
import { mount } from 'enzyme';
import AddPaper from '@containers/AdminPricing/AddPaper';
import { Provider } from 'react-redux';
import { store } from '@store';
import { BrowserRouter } from 'react-router-dom';
import { axios } from '@axios';
import moxios from 'moxios';
import { act } from 'react-dom/test-utils';
import { setPaperBindingResponse, setPaperErrors } from '@actions';
import InputWithLabel from '@components/UI/Input/InputWithLabel';

describe('Testing Login index', () => {
  it('should render Login container', async () => {
    moxios.install(axios as any);
    store.dispatch<any>(setPaperBindingResponse('message', 200));
    store.dispatch<any>(setPaperErrors({ name: 'kdfpkods' }));
    const comp = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={null}>
            <AddPaper />
          </Suspense>
        </BrowserRouter>
      </Provider>
    );

    act(() => {
      comp.find('button').at(0).simulate('click');
      comp.find('button').at(1).simulate('click');

      comp.find(InputWithLabel).at(0).simulate('change', { value: 'name' });

      comp.find(InputWithLabel).at(1).simulate('change', { value: '1' });
      comp.find(InputWithLabel).at(2).simulate('change', { value: '1' });
      comp.find(InputWithLabel).at(3).simulate('change', { value: '1' });
      comp.find(InputWithLabel).at(4).simulate('change', { value: '1' });

      comp.find(InputWithLabel).at(5).simulate('change', { value: '1' });
      comp.find(InputWithLabel).at(6).simulate('change', { value: '1' });
      comp.find(InputWithLabel).at(7).simulate('change', { value: '1' });
      comp.find(InputWithLabel).at(8).simulate('change', { value: '1' });

      comp.find('button').at(1).simulate('click');

      comp.update();

      comp.unmount();
    });
  });

  it('should render Login container', async () => {
    moxios.install(axios as any);
    store.dispatch<any>(setPaperBindingResponse('message', 400));
    const comp = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={null}>
            <AddPaper />
          </Suspense>
        </BrowserRouter>
      </Provider>
    );

    act(() => {
      comp.find('button').at(0).simulate('click');
      comp.find('button').at(1).simulate('click');

      comp.find(InputWithLabel).at(0).simulate('change', { value: 'name' });

      comp.find(InputWithLabel).at(1).simulate('change', { value: '1' });
      comp.find(InputWithLabel).at(2).simulate('change', { value: '1' });
      comp.find(InputWithLabel).at(3).simulate('change', { value: '1' });
      comp.find(InputWithLabel).at(4).simulate('change', { value: '1' });

      comp.find(InputWithLabel).at(5).simulate('change', { value: '1' });
      comp.find(InputWithLabel).at(6).simulate('change', { value: '1' });
      comp.find(InputWithLabel).at(7).simulate('change', { value: '1' });
      comp.find(InputWithLabel).at(8).simulate('change', { value: '1' });

      comp.find('button').at(1).simulate('click');

      comp.update();

      comp.unmount();
    });
  });
});
