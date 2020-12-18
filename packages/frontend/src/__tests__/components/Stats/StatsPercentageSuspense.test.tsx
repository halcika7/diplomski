import React from 'react';
import { mount } from 'enzyme';
import StatsPercentageSuspense from '@components/UI/Stats/StatsPercentageSuspense';

describe('Testing StatsPercentageSuspense StatsPercentageSuspense', () => {
  it('should render StatsPercentageSuspense component', () => {
    const comp = mount(
      <StatsPercentageSuspense>
        <div />
      </StatsPercentageSuspense>
    );

    comp.unmount();
  });
});
