import React, { FC } from 'react';
import { ResponsiveBar } from '@nivo/bar';
import { OrdersByMonths } from '@job/common';

import VisibilitySensor from '../../../helpers/VisibilitySensor';

interface Props {
  data: OrdersByMonths[];
}

const BarChart: FC<Props> = ({ data }) => (
  <VisibilitySensor height="350px">
    <ResponsiveBar
      data={data}
      keys={['Total Earnings', 'Number of Orders']}
      indexBy="month"
      margin={{ top: 50, right: 20, bottom: 70, left: 45 }}
      colors={{ scheme: 'category10' }}
      groupMode="stacked"
      padding={0.3}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: -60,
        legend: 'Month',
        legendPosition: 'middle',
        legendOffset: 45,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Number of Orders',
        legendPosition: 'middle',
        legendOffset: -40,
      }}
      theme={{
        axis: {
          ticks: {
            line: {
              stroke: 'black',
            },
            text: {
              fill: '#111',
            },
          },
          legend: {
            text: {
              fill: '#111',
            },
          },
        },
      }}
    />
  </VisibilitySensor>
);

export default React.memo(BarChart);
