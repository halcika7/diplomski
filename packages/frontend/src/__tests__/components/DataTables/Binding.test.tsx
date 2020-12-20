import { mount } from 'enzyme';

import Binding from '@components/DataTables/Binding';
import Table from '@components/DataTables';
import { Provider } from 'react-redux';
import { store } from '@store';
import { act } from 'react-dom/test-utils';

describe('Testing Binding component', () => {
  it('should render Binding', () => {
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

    act(() => {
      component.find('button').at(0).simulate('click');
      component.find(Table).find('tbody tr td').at(1).simulate('click');
      component
        .find(Table)
        .find('tbody tr td')
        .at(1)
        .simulate('change', { value: '21432' });

      component.update();

      component.unmount();
    });
  });
});
