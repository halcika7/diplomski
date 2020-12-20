import React, { FC } from 'react';
import { OrdersByMonths } from '@job/common';
const BarChart = React.lazy(() => import('../BarChart'));

interface Props {
  data: OrdersByMonths[] | null;
  loading: boolean;
  title?: string;
}

const OrdersYearByMonth: FC<Props> = ({ data, loading, title }) => (
  <>
    {title && <h4 className="mt-3 mb-3 ml-3 uppercase">{title}</h4>}
    <div className="card-chart">
      <div className="card-body" style={{ height: '350px', paddingTop: '0' }}>
        {data && !loading && <BarChart data={data} />}
      </div>
    </div>
  </>
);

export default React.memo(OrdersYearByMonth);
