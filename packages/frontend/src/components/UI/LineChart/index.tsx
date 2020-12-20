import { memo, FC, ReactNode } from 'react';
import { ResponsiveLine } from '@nivo/line';
import { OrderCostMonth } from '@job/common';
import VisibilitySensor from '../../../helpers/VisibilitySensor';

interface Props {
  data: OrderCostMonth[] | { x: number; y: number }[];
  xLabel: string;
  yLabel: string;
}

const axisBottom: any = (xLabel: string) => ({
  orient: 'bottom',
  tickSize: 5,
  tickPadding: 5,
  tickRotation: -60,
  legend: xLabel as ReactNode,
  legendOffset: 45,
  legendPosition: 'middle',
});

const axisLeft: any = (yLabel: string) => ({
  orient: 'left',
  tickSize: 5,
  tickPadding: 5,
  tickRotation: 0,
  legend: yLabel as ReactNode,
  legendOffset: -40,
  legendPosition: 'middle',
});

const LineChart: FC<Props> = ({ data, xLabel, yLabel }) => (
  <VisibilitySensor height="350px">
    <ResponsiveLine
      data={[
        {
          id: 'Some ID',
          data,
        },
      ]}
      margin={{ top: 50, right: 20, bottom: 70, left: 45 }}
      xScale={{ type: 'point' }}
      yScale={{ type: 'linear', stacked: true, min: 'auto', max: 'auto' }}
      curve="monotoneX"
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

export default memo(LineChart);
