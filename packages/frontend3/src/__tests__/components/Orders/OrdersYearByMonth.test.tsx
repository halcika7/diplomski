import React from 'react';
import { mount } from 'enzyme';

import OrdersYearByMonth from '@components/UI/Orders/OrdersYearByMonth';
import GraphSuspense from '@components/UI/Orders/GraphSuspense';

describe('Testing OrdersYearByMonth component', () => {
  it('should render OrdersYearByMonth component', () => {
    const component = mount(
      <OrdersYearByMonth
        title="sjsidofj"
        loading
        data={[
          {
            'Number of Orders': 1,
            'Total Earnings': 1,
            month: 1,
            monthNumber: 1,
          },
        ]}
      />
    );

    expect(component.find('h4').length).toBe(1);

    component.unmount();
  });

  it('should render OrdersYearByMonth component without loading', () => {
    const component = mount(
      <GraphSuspense>
        <OrdersYearByMonth
          title="sjsidofj"
          loading={false}
          data={[
            {
              'Number of Orders': 1,
              'Total Earnings': 1,
              month: 1,
              monthNumber: 1,
            },
          ]}
        />
      </GraphSuspense>
    );

    expect(component.find('h4').length).toBe(1);

    component.unmount();
  });
});
