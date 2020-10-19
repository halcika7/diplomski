import React from 'react';
const LineChart = React.lazy(() => import('../LineChart'));

const Earnings = ({
  data,
  loading,
  title,
  date,
  xLabel,
  yLabel,
  overflow,
}: any) => (
  <div className="col-xl-6">
    <div
      className="card-chart card"
      style={
        overflow && {
          overflowX: 'visible',
        }
      }
    >
      <h4 className="mt-3 mb-3 ml-3 uppercase">
        {title} {date && 'in ' + new Date().getFullYear()}
      </h4>
      <div
        className="card-body"
        // style={
        //   !overflow
        //     ? { height: '350px', paddingTop: '0' }
        //     : overflow && loading
        //     ? {
        //         height: '350px',
        //         paddingTop: '0',
        //       }
        //     : overflow &&
        //       !loading && {
        //         height: '350px',
        //         paddingTop: '0',
        //         minWidth: '1500px',
        //       }
        // }
      >
        {data && data.length && !loading && (
          <LineChart data={data} xLabel={xLabel} yLabel={yLabel} />
        )}
      </div>
    </div>
  </div>
);

export default React.memo(Earnings);
