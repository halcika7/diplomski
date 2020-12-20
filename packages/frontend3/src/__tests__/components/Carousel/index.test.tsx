import React from 'react';
import { mount } from 'enzyme';

import Carousel from '@components/UI/Carousel';

describe('Testing Carousel component', () => {
  it('should render Carousel', () => {
    const component = mount(<Carousel />);

    expect(component.find('img').length).toBe(7);

    component.unmount();
  });
});
