import React, { FC } from 'react';
import { ResponsiveBarCanvas } from '@nivo/bar';

import VisibilitySensor from '../../../helpers/VisibilitySensor';

interface Props {
  data: any[];
}

const BarChart: FC<Props> = ({ data }) => (
  <VisibilitySensor height="350px">
    <ResponsiveBarCanvas
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
          fontSize: '14px',
          tickColor: '#111',
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
        }  as any,
      }}
    />
  </VisibilitySensor>
);

export default React.memo(BarChart);
