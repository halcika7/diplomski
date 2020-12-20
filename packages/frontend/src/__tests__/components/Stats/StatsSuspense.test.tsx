import { mount } from 'enzyme';
import StatsSuspense from '@components/UI/Stats/StatsSuspense';

describe('Testing StatsSuspense StatsSuspense', () => {
  it('should render StatsSuspense component', () => {
    const comp = mount(
      <StatsSuspense classes="jsdifds">
        <div />
      </StatsSuspense>
    );

    comp.unmount();
  });

  it('should render StatsSuspense component without classes', () => {
    const comp = mount(
      <StatsSuspense>
        <div />
      </StatsSuspense>
    );

    comp.unmount();
  });
});
