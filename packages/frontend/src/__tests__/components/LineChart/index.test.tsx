import React from 'react';
import { mount } from 'enzyme';

import Chart from '@components/UI/LineChart';

describe('Testing Line Chart component', () => {
  it('should render line chart', () => {
    const component = mount(
      <Chart data={[{ x: 1, y: 1 }]} xLabel="kofjda" yLabel="sdofjiosdof" />
    );

    expect(component.find('div').length).toBe(1);

    component.unmount();
  });
});
