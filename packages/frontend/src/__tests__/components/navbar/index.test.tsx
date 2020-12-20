import { mount } from 'enzyme';
import Nav from '@components/Navbar';

import ReduxProvider from '../../__mocks__/provider';
import { BrowserRouter } from 'react-router-dom';

describe('Testing navbar index', () => {
  it('should render navbar component', () => {
    const comp = mount(
      <ReduxProvider>
        <BrowserRouter>
          <Nav role="professor" />
        </BrowserRouter>
      </ReduxProvider>
    );

    comp.find('.dropdown-toggle').at(0).simulate('click');
    comp.find('.navbar-toggler').at(0).simulate('click');
    comp.find('.d-lg-none').at(0).simulate('click');
    comp.find('.dropdown-toggle').at(1).simulate('click');
    comp.find('.cursor-pointer').at(0).simulate('click');

    comp.unmount();
  });
});
