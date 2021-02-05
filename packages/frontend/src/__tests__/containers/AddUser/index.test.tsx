import { Suspense } from 'react';
import { mount } from 'enzyme';
import AddUser from '@containers/AddUser';
import InputWithLabel from '@components/UI/Input/InputWithLabel';
import { Provider } from 'react-redux';
import { store } from '@store';
import { BrowserRouter } from 'react-router-dom';
import { axios } from '@axios';
import moxios from 'moxios';
import ReactSelect from 'react-select';
import { act } from 'react-dom/test-utils';
import { setUserResponse } from '@actions';

describe('Testing Login index', () => {
  it('should render Login container', async () => {
    moxios.install(axios as any);
    store.dispatch<any>(setUserResponse('message', 200));
    const comp = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={null}>
            <AddUser />
          </Suspense>
        </BrowserRouter>
      </Provider>
    );

    act(() => {
      comp.find('button').at(0).simulate('click');
      comp.find('button').at(1).simulate('click');

      comp
        .find(InputWithLabel)
        .at(0)
        .simulate('change', { value: 'email@gmail.com' });

      comp.find(ReactSelect).prop('onChange')({
        label: '2',
        value: '2',
      });

      comp.find('button').at(1).simulate('click');

      comp.update();

      comp.unmount();
    });
  });

  it('should render Login container', async () => {
    moxios.install(axios as any);
    store.dispatch<any>(setUserResponse('message', 400));
    const comp = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Suspense fallback={null}>
            <AddUser />
          </Suspense>
        </BrowserRouter>
      </Provider>
    );

    act(() => {
      comp.find('button').at(0).simulate('click');
      comp.find('button').at(1).simulate('click');

      comp
        .find(InputWithLabel)
        .at(0)
        .simulate('change', { value: 'email@gmail.com' });

      comp.find(ReactSelect).prop('onChange')({
        label: '2',
        value: '2',
      });

      comp.find('button').at(1).simulate('click');

      comp.update();

      comp.unmount();
    });
  });
});
