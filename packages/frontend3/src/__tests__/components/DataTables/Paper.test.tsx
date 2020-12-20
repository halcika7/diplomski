import React from 'react';
import { mount } from 'enzyme';

import Paper from '@components/DataTables/Paper';
import Table from '@components/DataTables';
import { Provider } from 'react-redux';
import { store } from '@store';
import { act } from 'react-dom/test-utils';

describe('Testing Paper component', () => {
  it('should render Paper', () => {
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

    act(() => {
      component.find('button').at(0).simulate('click');
      component.find(Table).find('tbody tr td').at(1).simulate('click');
      component
        .find(Table)
        .find('tbody tr td')
        .at(1)
        .simulate('change', { value: '21432' });
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
