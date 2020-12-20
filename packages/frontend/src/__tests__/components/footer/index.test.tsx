import { mount } from 'enzyme';
import Footer from '@components/Footer';

describe('Testing footer index', () => {
  it('should render footer component', () => {
    const comp = mount(<Footer />);

    comp.unmount();
  });
});
