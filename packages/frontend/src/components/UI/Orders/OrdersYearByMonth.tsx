import React from 'react';
const BarChart = React.lazy(() => import('../BarChart'));

const OrdersYearByMonth = ({ data, loading, title }: any) => (
  <div className="col-xl-6">
    <div className="card-chart card">
      <h4 className="mt-3 mb-3 ml-3 uppercase">
        {title} {new Date().getFullYear()}
      </h4>
      <div className="card-body" style={{ height: '350px', paddingTop: '0' }}>
        {data && data.length && !loading && <BarChart data={data} />}
      </div>
    </div>
  </div>
);

export default React.memo(OrdersYearByMonth);
