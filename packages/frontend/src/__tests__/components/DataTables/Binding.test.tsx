import { mount } from 'enzyme';

import Binding from '@components/DataTables/Binding';
import Table from '@components/DataTables';
import { Provider } from 'react-redux';
import { store } from '@store';
import { act } from 'react-dom/test-utils';
import { axios } from '@axios';
import moxios from 'moxios';

describe('Testing Binding component', () => {
  beforeEach(() => {
    moxios.install(axios as any);
  });

  afterEach(() => {
    moxios.uninstall();
  });
  it('should render Binding', async () => {
    const component = mount(
      <Provider store={store}>
        <Binding
          bindings={[
            {
              _id: '1werwerewr',
              available: true,
              from100upTo150: 2,
              from25upTo50: 2,
              from50upTo100: 2,
              name: 'njojj',
              upTo25: 2,
            },
          ]}
        />
      </Provider>
    );

    await act(async () => {
      component.find('button').at(0).simulate('click');
      component.find(Table).find('tbody tr td').at(1).simulate('click');
      await new Promise(resolve => setTimeout(() => resolve(true), 100));
      component.update();

      component
        .find(Table)
        .find('tbody tr td')
        .at(1)
        .simulate('change', { value: 49 });
      component.find('.edit-text').simulate('keyDown', { keyCode: 13 });
      await new Promise(resolve => setTimeout(() => resolve(true), 100));
      component.update();

      component.find(Table).find('tbody tr td').at(1).simulate('click');
      component.find('.edit-text').simulate('keyDown', { keyCode: 48 });
      component.find('.edit-text').simulate('keyDown', { keyCode: 13 });
      await new Promise(resolve => setTimeout(() => resolve(true), 2100));
      component.update();

      component.unmount();
    });
  });
});
