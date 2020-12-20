import React from 'react';
import { mount } from 'enzyme';
import Stats from '@components/UI/Stats/Stats';

describe('Testing Stats Stats', () => {
  it('should render Stats component', () => {
    const comp = mount(
      <Stats heading="ifjosd" icon="dsf" value="dfjods" classes="disf" />
    );

    comp.unmount();
  });

  it('should render Stats component without classes', () => {
    const comp = mount(<Stats heading="ifjosd" icon="dsf" value={undefined} />);

    comp.unmount();
  });
});
