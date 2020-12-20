import React from 'react';
import { mount } from 'enzyme';
import Sidebar from '@components/Sidebar';
import ReduxProvider from '../../__mocks__/provider';
import { BrowserRouter } from 'react-router-dom';

describe('Testing sidebar index', () => {
  it('should render sidebar component', () => {
    const comp = mount(
      <ReduxProvider>
        <BrowserRouter>
          <Sidebar role="professor" />
        </BrowserRouter>
      </ReduxProvider>
    );

    comp.find('.toggleDropdown').at(0).simulate('click');

    comp.unmount();
  });

  it('should render sidebar 2 component', () => {
    const comp = mount(
      <ReduxProvider>
        <BrowserRouter>
          <Sidebar role="admin" />
        </BrowserRouter>
      </ReduxProvider>
    );

    comp.unmount();
  });

  it('should render sidebar 3 component', () => {
    const comp = mount(
      <ReduxProvider>
        <BrowserRouter>
          <Sidebar role="worker" />
        </BrowserRouter>
      </ReduxProvider>
    );

    comp.unmount();
  });
});
