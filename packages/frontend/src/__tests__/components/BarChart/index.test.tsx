import { mount } from 'enzyme';

import Chart from '@components/UI/BarChart';

describe('Testing Bar Chart component', () => {
  it('should render bar chart', () => {
    const component = mount(
      <Chart
        data={[
          {
            month: 1,
            'Number of Orders': 2,
            'Total Earnings': 120,
            monthNumber: 1,
          },
        ]}
      />
    );

    expect(component.find('div').length).toBe(1);

    component.unmount();
  });
});
