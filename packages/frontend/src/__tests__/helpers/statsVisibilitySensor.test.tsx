import { mount } from 'enzyme';
import StatsVisibilitySensor from '../../helpers/StatsVisibilitySensor';

describe('Testing truncText helper', () => {
  it('should use first case value.length < 50', () => {
    const cmp = mount(
      <StatsVisibilitySensor stats>
        <div />
      </StatsVisibilitySensor>
    );

    cmp.update();

    cmp.unmount();
  });
});
