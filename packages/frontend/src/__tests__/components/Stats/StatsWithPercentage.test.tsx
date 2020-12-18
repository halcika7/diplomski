import React from 'react';
import { mount } from 'enzyme';
import StatsWithPercentage from '@components/UI/Stats/StatsWithPercentage';

describe('Testing StatsWithPercentage StatsWithPercentage', () => {
  it('should render StatsWithPercentage component', () => {
    const comp = mount(
      <StatsWithPercentage
        heading="isofd"
        heading2="nsdiifnu"
        icon="sdofi"
        value={1}
        oldValue={2}
        price
      />
    );

    comp.unmount();
  });

  it('should render StatsWithPercentage component old value 0', () => {
    const comp = mount(
      <StatsWithPercentage
        heading="isofd"
        heading2="nsdiifnu"
        icon="sdofi"
        value={0}
        oldValue={0}
        price
      />
    );

    comp.unmount();
  });

  it('should render StatsWithPercentage component value > oldValue', () => {
    const comp = mount(
      <StatsWithPercentage
        heading="isofd"
        heading2="nsdiifnu"
        icon="sdofi"
        value={2}
        oldValue={0}
      />
    );

    comp.unmount();
  });

  it('should render StatsWithPercentage component value === null', () => {
    const comp = mount(
      <StatsWithPercentage
        heading="isofd"
        heading2="nsdiifnu"
        icon="sdofi"
        value={null}
        oldValue={0}
      />
    );

    comp.unmount();
  });
});
