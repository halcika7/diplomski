import { mount } from 'enzyme';

import Switch from '@components/UI/Buttons';

const change = jest.fn();

describe('Testing Switch button component', () => {
  it('should render switch button', () => {
    const component = mount(
      <Switch name="button" value setValue={change} disabled={false} />
    );

    expect(component.find('input').length).toBe(1);

    component.find('input').simulate('click');

    component.unmount();
  });
});
