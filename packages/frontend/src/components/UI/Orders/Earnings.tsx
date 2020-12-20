import { memo, FC } from 'react';
import LineChart from '../LineChart';
import { OrderCostMonth } from '@job/common';

interface Props {
  data: OrderCostMonth[] | { x: number; y: number }[] | null;
  loading: boolean;
  date?: boolean;
  overflow?: boolean;
  xLabel: string;
  yLabel: string;
  title?: string;
}

const Earnings: FC<Props> = ({
  data,
  loading,
  title,
  date = false,
  xLabel,
  yLabel,
  overflow = false,
}) => (
  <>
    {title && (
      <h4 className="mt-3 mb-3 ml-3 uppercase">
        {title} {date && `in ${new Date().getFullYear()}`}
      </h4>
    )}
    <div
      className="card-chart"
      style={
        overflow
          ? {
              overflowX: 'visible',
            }
          : {}
      }
    >
      <div
        className="card-body"
        style={
          !overflow || loading
            ? { height: '350px', paddingTop: '0' }
            : {
                height: '350px',
                paddingTop: '0',
                minWidth: '1500px',
                overflowX: 'visible',
              }
        }
      >
        {data && !loading && (
          <LineChart data={data} xLabel={xLabel} yLabel={yLabel} />
        )}
      </div>
    </div>
  </>
);

export default memo(Earnings);
