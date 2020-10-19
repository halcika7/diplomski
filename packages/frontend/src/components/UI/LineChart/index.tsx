import React from 'react';
import { ResponsiveLineCanvas } from '@nivo/line';
import VisibilitySensor from '../../../helpers/VisibilitySensor';

const axisBottom: any = (xLabel: any) => ({
  orient: 'bottom',
  tickSize: 5,
  tickPadding: 5,
  tickRotation: -60,
  legend: xLabel,
  legendOffset: 45,
  legendPosition: 'middle',
});

const axisLeft: any = (yLabel: any) => ({
  orient: 'left',
  tickSize: 5,
  tickPadding: 5,
  tickRotation: 0,
  legend: yLabel,
  legendOffset: -40,
  legendPosition: 'middle',
  tickColor: '#543543',
});

const LineChart = ({ data, xLabel, yLabel }: any) => (
  <VisibilitySensor height="350px">
    <ResponsiveLineCanvas
      data={[
        {
          id: 'Some ID',
          data: data,
        },
      ]}
      margin={{ top: 50, right: 20, bottom: 70, left: 45 }}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', stacked: true, min: 'auto', max: 'auto' }}
      curve={'monotoneX'}
      axisBottom={axisBottom(xLabel)}
      axisLeft={axisLeft(yLabel)}
      colors={{ scheme: 'category10' }}
      enableGridY={false}
      pointSize={6}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={6}
      pointBorderColor={{ from: 'serieColor' }}
      theme={{
        axis: {
          fontSize: '14px',
          tickColor: '#212529',
          ticks: {
            line: {
              stroke: 'transparent',
            },
            text: {
              fill: '#212529',
            },
          },
        } as any,
      }}
    />
  </VisibilitySensor>
);

export default React.memo(LineChart);
