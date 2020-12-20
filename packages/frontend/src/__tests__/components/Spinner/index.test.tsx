import { mount } from 'enzyme';

import SmallSpinner from '@components/UI/Spinner/SmallSpinner';
import Spinner from '@components/UI/Spinner/Spinner';

describe('Testing Spinners component', () => {
  it('should render small spinner', () => {
    const component = mount(<SmallSpinner />);

    expect(component.find('div').length).toBe(1);

    component.unmount();
  });

  it('should render spinner', () => {
    const component = mount(<Spinner />);

    expect(component.find('div').length).toBe(1);

    component.unmount();
  });
});
