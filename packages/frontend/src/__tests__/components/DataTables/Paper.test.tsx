import { mount } from 'enzyme';

import Paper from '@components/DataTables/Paper';
import Table from '@components/DataTables';
import { Provider } from 'react-redux';
import { store } from '@store';
import { act } from 'react-dom/test-utils';
import { axios } from '@axios';
import moxios from 'moxios';

describe('Testing Paper component', () => {
  beforeEach(() => {
    moxios.install(axios as any);
  });

  afterEach(() => {
    moxios.uninstall();
  });
  it('should render Paper', async () => {
    const component = mount(
      <Provider store={store}>
        <Paper
          role="admin"
          papers={[
            {
              _id: 'dfskpd',
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
              name: 'dfjodsijfo',
            },
            {
              _id: 'dkfpksodpfo',
              available: false,
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
              name: 'dfjodsijfo',
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

      component.find('button').at(0).simulate('click');
      component.update();

      component.unmount();
    });
  });

  it('should render Paper', () => {
    const component = mount(
      <Provider store={store}>
        <Paper role="worker" papers={[]} />
      </Provider>
    );

    component.unmount();
  });
});
