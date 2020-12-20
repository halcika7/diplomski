import { mount } from 'enzyme';

import Alert from '@components/UI/Alert';

const onClose = () => jest.fn();
const message = 'some message';

describe('Testing Alert component', () => {
  it('should render alert', () => {
    const component = mount(<Alert message={message} clear={onClose} />);

    expect(component.find('div').length).toBe(1);
    expect(component.find('button').length).toBe(1);

    component.find('button').simulate('click');

    component.unmount();
  });
});
