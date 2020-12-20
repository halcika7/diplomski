import { mount } from 'enzyme';

import File from '@components/DataTables/File';
import Table from '@components/DataTables';
import { Provider } from 'react-redux';
import { store } from '@store';
import { act } from 'react-dom/test-utils';

describe('Testing File component', () => {
  it('should render File', () => {
    const component = mount(
      <Provider store={store}>
        <File
          files={[
            {
              _id: 'sfiodf',
              createdAt: new Date(),
              name: 'nfodijo',
              orderedBy: { name: 'wjdfoif', _id: 'wfojiwd' },
              path: 'ijfijowef',
              updatedAt: new Date(),
            },
          ]}
        />
      </Provider>
    );

    act(() => {
      component.find(Table).find('tbody tr td').at(1).simulate('click');

      component.update();

      component.unmount();
    });
  });
});
