import React from 'react';
import { mount } from 'enzyme';

import Earnings from '@components/UI/Orders/Earnings';

describe('Testing Earnings component', () => {
  it('should render Earnings component', () => {
    const component = mount(
      <Earnings
        data={[{ x: 1, y: 2 }]}
        loading={false}
        date
        overflow
        title="naofji"
        xLabel="jdfoijsd"
        yLabel="jdfiojsoidj"
      />
    );

    expect(component.find('h4').length).toBe(1);

    component.unmount();
  });

  it('should render Earnings component without date prop', () => {
    const component = mount(
      <Earnings
        data={[{ x: 1, y: 2 }]}
        loading={false}
        overflow={true}
        title="naofji"
        xLabel="jdfoijsd"
        yLabel="jdfiojsoidj"
      />
    );

    expect(component.find('h4').length).toBe(1);

    component.unmount();
  });

  it('should render Earnings component without overflow prop', () => {
    const component = mount(
      <Earnings
        data={[{ x: 1, y: 2 }]}
        loading={false}
        title="naofji"
        xLabel="jdfoijsd"
        yLabel="jdfiojsoidj"
      />
    );

    expect(component.find('h4').length).toBe(1);

    component.unmount();
  });

  it('should render Earnings component with loading', () => {
    const component = mount(
      <Earnings
        data={[{ x: 1, y: 2 }]}
        loading={true}
        overflow
        title="naofji"
        xLabel="jdfoijsd"
        yLabel="jdfiojsoidj"
      />
    );

    expect(component.find('h4').length).toBe(1);

    component.unmount();
  });
});
