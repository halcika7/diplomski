import React from 'react';

const GraphSuspense = React.lazy(() =>
  import('../../components/UI/Orders/GraphSuspense')
);
const StatsSuspense = React.lazy(() =>
  import('../../components/UI/Stats/StatsSuspense')
);
const StatsPercentageSuspense = React.lazy(() =>
  import('../../components/UI/Stats/StatsPercentageSuspense')
);
const OrdersYearByMonth = React.lazy(() =>
  import('../../components/UI/Orders/OrdersYearByMonth')
);
const Earnings = React.lazy(() =>
  import('../../components/UI/Orders/Earnings')
);
const Stats = React.lazy(() => import('../../components/UI/Stats/Stats'));
const StatsWithPercentage = React.lazy(() =>
  import('../../components/UI/Stats/StatsWithPercentage')
);

const Administration = (props: any) => (
  <>
    <div className="col-12">
      <div className="row">
        <div className="col-12">
          <div className="card">
            <h2 className="mt-2 mb-2 ml-3">Earnings & Debt</h2>
          </div>
        </div>
        <StatsSuspense classes="col-6 col-xl-3">
          <Stats
            value={props.dashboard.universityEarnings + ' KM'}
            heading="Total spendings"
            icon="money-wave"
          />
        </StatsSuspense>
        <StatsSuspense classes="col-6 col-xl-3">
          <Stats
            value={props.dashboard.universityDebt + ' KM'}
            heading="Total debt"
            icon="money-wave"
          />
        </StatsSuspense>
        <StatsPercentageSuspense classes="col-6 col-xl-3">
          <StatsWithPercentage
            value={props.dashboard.thisMonthEarningsUniversity}
            oldValue={props.dashboard.lastMonthEarningsUniversity}
            heading="This month spendings"
            heading2="Last month spendings"
            icon="money-wave"
            price={true}
          />
        </StatsPercentageSuspense>
        <StatsPercentageSuspense classes="col-6 col-xl-3">
          <StatsWithPercentage
            value={props.dashboard.thisMonthDebtUniversity}
            oldValue={props.dashboard.lastMonthDebtUniversity}
            heading="This month debt"
            heading2="Last month debt"
            icon="money-wave"
            price={true}
          />
        </StatsPercentageSuspense>
        <div className="col-12">
          <div className="card">
            <h2 className="mt-2 mb-2 ml-3">Orders</h2>
          </div>
        </div>
        <StatsSuspense classes="col-6 col-xl-3">
          <Stats
            value={props.dashboard.universityOrders}
            heading="Total orders"
            icon="box"
          />
        </StatsSuspense>
        <StatsSuspense classes="col-6 col-xl-3">
          <Stats
            value={props.dashboard.universityFinishedOrders}
            heading="Total finished orders"
            icon="box"
          />
        </StatsSuspense>
        <StatsSuspense classes="col-6 col-xl-3">
          <Stats
            value={props.dashboard.universityPaidOrders}
            heading="Total paid orders"
            icon="box"
          />
        </StatsSuspense>
        <StatsSuspense classes="col-6 col-xl-3">
          <Stats
            value={props.dashboard.universityUnpaidOrders}
            heading="Total unpaid orders"
            icon="box"
          />
        </StatsSuspense>
        <StatsSuspense classes="col-6 col-xl-3">
          <Stats
            value={props.dashboard.rejectedOrders}
            heading="Total rejected orders"
            icon="box"
          />
        </StatsSuspense>
        <StatsPercentageSuspense classes="col-6 col-xl-3">
          <StatsWithPercentage
            value={props.dashboard.thisOrdersUniversity}
            oldValue={props.dashboard.lastOrdersUniversity}
            heading="This month total orders"
            heading2="Last month total orders"
            icon="money-wave"
          />
        </StatsPercentageSuspense>
        <StatsPercentageSuspense classes="col-6 col-xl-3">
          <StatsWithPercentage
            value={props.dashboard.thisFinishedOrdersUniversity}
            oldValue={props.dashboard.lastFinishedOrdersUniversity}
            heading="This month total finished orders"
            heading2="Last month total finished orders"
            icon="money-wave"
          />
        </StatsPercentageSuspense>
        <StatsPercentageSuspense classes="col-6 col-xl-3">
          <StatsWithPercentage
            value={props.dashboard.thisPaidOrdersUniversity}
            oldValue={props.dashboard.lastPaidOrdersUniversity}
            heading="This month total paid orders"
            heading2="Last month total paid orders"
            icon="money-wave"
          />
        </StatsPercentageSuspense>
        <StatsPercentageSuspense classes="col-6 col-xl-3">
          <StatsWithPercentage
            value={props.dashboard.thisUnpaidOrdersUniversity}
            oldValue={props.dashboard.lastUnpaidOrdersUniversity}
            heading="This month total unpaid orders"
            heading2="Last month total unpaid orders"
            icon="money-wave"
          />
        </StatsPercentageSuspense>
        <StatsPercentageSuspense classes="col-6 col-xl-3">
          <StatsWithPercentage
            value={props.dashboard.thisRejectedOrders}
            oldValue={props.dashboard.lastRejectedOrders}
            heading="This month total rejected orders"
            heading2="Last month total rejected orders"
            icon="money-wave"
          />
        </StatsPercentageSuspense>
      </div>
    </div>
    <div className="col-12">
      <div className="card">
        <h2 className="mt-2 mb-2 ml-3">Earnings & Debt Graphs</h2>
      </div>
    </div>
    <GraphSuspense>
      <Earnings
        data={props.order.allMonthsEarningUniversity}
        loading={props.loading}
        title="Total Spendings By Month"
        date
        yLabel="Spendings"
        xLabel="Month"
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allThisMonthEarningsUniversity}
        loading={props.loading}
        title="Total Spendings this month"
        yLabel="Spendings"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allLastMonthEarningsUniversity}
        loading={props.loading}
        title="Total Spendings last month"
        yLabel="Spendings"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allThisMonthDebtUniversity}
        loading={props.loading}
        title="Total debt this month"
        yLabel="Debt"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allLastMonthDebtUniversity}
        loading={props.loading}
        title="Total debt last month"
        yLabel="Debt"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <div className="col-12">
      <div className="card">
        <h2 className="mt-2 mb-2 ml-3">Orders Graphs</h2>
      </div>
    </div>
    <GraphSuspense>
      <OrdersYearByMonth
        data={props.order.allMonthsUniversity}
        loading={props.loading}
        title="Total Number of Paid Orders By Month in"
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allThisMonthUniversity}
        loading={props.loading}
        title="Total orders this month"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allLastMonthUniversity}
        loading={props.loading}
        title="Total orders last month"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allThisMonthFinishedUniversity}
        loading={props.loading}
        title="Total finished orders this month"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allLastMonthFinishedUniversity}
        loading={props.loading}
        title="Total finished orders last month"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allThisMonthPaidUniversity}
        loading={props.loading}
        title="Total paid orders this month"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allLastMonthPaidUniversity}
        loading={props.loading}
        title="Total paid orders last month"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allThisMonthUnpaidUniversity}
        loading={props.loading}
        title="Total unpaid orders this month"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allLastMonthUnpaidUniversity}
        loading={props.loading}
        title="Total unpaid orders last month"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allThisMonthRejected}
        loading={props.loading}
        title="Total rejected orders this month"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allLastMonthRejected}
        loading={props.loading}
        title="Total rejected orders last month"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
  </>
);

export default React.memo(Administration);
