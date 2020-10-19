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

const Professors = () => (
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
            // value={props.dashboard.earnings + ' KM'}
            heading="Total spendings"
            icon="money-wave"
          />
        </StatsSuspense>
        <StatsSuspense classes="col-6 col-xl-3">
          <Stats
            // value={props.dashboard.usersEarnings + ' KM'}
            heading="Total spendings for personal"
            icon="money-wave"
          />
        </StatsSuspense>
        <StatsSuspense classes="col-6 col-xl-3">
          <Stats
            // value={props.dashboard.universityEarnings + ' KM'}
            heading="Total spendings for university"
            icon="money-wave"
          />
        </StatsSuspense>
        <StatsSuspense classes="col-6 col-xl-3">
          <Stats
            // value={props.dashboard.usersDebt + ' KM'}
            heading="Total debt for personal"
            icon="money-wave"
          />
        </StatsSuspense>
        <StatsPercentageSuspense classes="col-6 col-xl-3">
          <StatsWithPercentage
            // value={props.dashboard.thisMonthEarnings}
            // oldValue={props.dashboard.lastMonthEarnings}
            heading="This month spendings"
            heading2="Last month spendings"
            icon="money-wave"
            price
          />
        </StatsPercentageSuspense>
        <StatsPercentageSuspense classes="col-6 col-xl-3">
          <StatsWithPercentage
            // value={props.dashboard.thisMonthEarningsProfessors}
            // oldValue={props.dashboard.lastMonthEarningsProfessors}
            heading="This month spendings for personal"
            heading2="Last month spendings for personal"
            icon="money-wave"
            price
          />
        </StatsPercentageSuspense>
        <StatsPercentageSuspense classes="col-6 col-xl-3">
          <StatsWithPercentage
            // value={props.dashboard.thisMonthEarningsUniversity}
            // oldValue={props.dashboard.lastMonthEarningsUniversity}
            heading="This month spendings for personal"
            heading2="Last month spendings for personal"
            icon="money-wave"
            price
          />
        </StatsPercentageSuspense>
        <StatsPercentageSuspense classes="col-6 col-xl-3">
          <StatsWithPercentage
            // value={props.dashboard.thisMonthDebtProfessors}
            // oldValue={props.dashboard.lastMonthDebtProfessors}
            heading="This month debt for personal"
            heading2="Last month debt for personal"
            icon="money-wave"
            price
          />
        </StatsPercentageSuspense>
        <div className="col-12">
          <div className="card">
            <h2 className="mt-2 mb-2 ml-3">Orders</h2>
          </div>
        </div>
        <StatsSuspense classes="col-6 col-xl-3">
          <Stats
            // value={props.dashboard.orders}
            heading="Total number of orders"
            icon="box"
          />
        </StatsSuspense>
        <StatsSuspense classes="col-6 col-xl-3">
          <Stats
            // value={props.dashboard.usersOrders}
            heading="Total number of personal orders"
            icon="box"
          />
        </StatsSuspense>
        <StatsSuspense classes="col-6 col-xl-3">
          <Stats
            // value={props.dashboard.universityOrders}
            heading="Total number of university orders"
            icon="box"
          />
        </StatsSuspense>
        <StatsSuspense classes="col-6 col-xl-3">
          <Stats
            // value={props.dashboard.finishedOrders}
            heading="Total number of finished orders"
            icon="box"
          />
        </StatsSuspense>
        <StatsSuspense classes="col-6 col-xl-3">
          <Stats
            // value={props.dashboard.usersPaidOrders}
            heading="Total number of paid personal orders"
            icon="box"
          />
        </StatsSuspense>
        <StatsSuspense classes="col-6 col-xl-3">
          <Stats
            // value={props.dashboard.usersUnpaidOrders}
            heading="Total number of unpaid personal orders"
            icon="box"
          />
        </StatsSuspense>
        <StatsSuspense classes="col-6 col-xl-3">
          <Stats
            // value={props.dashboard.rejectedOrders}
            heading="Total number of rejected orders"
            icon="box"
          />
        </StatsSuspense>
        <StatsPercentageSuspense classes="col-6 col-xl-3">
          <StatsWithPercentage
            // value={props.dashboard.thisOrders}
            // oldValue={props.dashboard.lastOrders}
            heading="This month total orders"
            heading2="Last month total orders"
            icon="money-wave"
          />
        </StatsPercentageSuspense>
        <StatsPercentageSuspense classes="col-6 col-xl-3">
          <StatsWithPercentage
            // value={props.dashboard.thisOrdersUsers}
            // oldValue={props.dashboard.lastOrdersUsers}
            heading="This month total personal orders"
            heading2="Last month total personal orders"
            icon="money-wave"
          />
        </StatsPercentageSuspense>
        <StatsPercentageSuspense classes="col-6 col-xl-3">
          <StatsWithPercentage
            // value={props.dashboard.thisOrdersUniversity}
            // oldValue={props.dashboard.lastOrdersUniversity}
            heading="This month total university orders"
            heading2="Last month total university orders"
            icon="money-wave"
          />
        </StatsPercentageSuspense>
        <StatsPercentageSuspense classes="col-6 col-xl-3">
          <StatsWithPercentage
            // value={props.dashboard.thisPaidOrdersUsers}
            // oldValue={props.dashboard.lastPaidOrdersUsers}
            heading="This month total paid personal orders"
            heading2="Last month total paid personal orders"
            icon="money-wave"
          />
        </StatsPercentageSuspense>
        <StatsPercentageSuspense classes="col-6 col-xl-3">
          <StatsWithPercentage
            // value={props.dashboard.thisUnpaidOrdersUsers}
            // oldValue={props.dashboard.lastUnpaidOrdersUsers}
            heading="This month total unpaid personal orders"
            heading2="Last month total unpaid personal orders"
            icon="money-wave"
          />
        </StatsPercentageSuspense>
        <StatsPercentageSuspense classes="col-6 col-xl-3">
          <StatsWithPercentage
            // value={props.dashboard.thisRejectedOrders}
            // oldValue={props.dashboard.lastRejectedOrders}
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
        // data={props.order.allMonthsEarning}
        // loading={props.loading}
        title="Total Spendings By Month"
        date
        yLabel="Spendings"
        xLabel="Month"
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        // data={props.order.allMonthsEarningUsers}
        // loading={props.loading}
        title="Total Spendings By Month for personal"
        date
        yLabel="Spendings"
        xLabel="Month"
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        // data={props.order.allMonthsEarningUniversity}
        // loading={props.loading}
        title="Total Spendings By Month for university"
        date
        yLabel="Spendings"
        xLabel="Month"
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        // data={props.order.allThisMonthEarnings}
        // loading={props.loading}
        title="Total Spendings this month"
        date
        yLabel="Spendings"
        xLabel="Date day"
        overflow
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        // data={props.order.allLastMonthEarnings}
        // loading={props.loading}
        title="Total Spendings last month"
        date
        yLabel="Spendings"
        xLabel="Date Day"
        overflow
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        // data={props.order.allThisMonthEarningsUsers}
        // loading={props.loading}
        title="Total spending for personal orders this month"
        date
        yLabel="Spendings"
        xLabel="Date Day"
        overflow
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        // data={props.order.allLastMonthEarningsUsers}
        // loading={props.loading}
        title="Total spending for personal orders last month"
        date
        yLabel="Spendings"
        xLabel="Date Day"
        overflow
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        // data={props.order.allThisMonthDebtUsers}
        // loading={props.loading}
        title="Total debt for personal orders this month"
        date
        yLabel="Debt"
        xLabel="Date Day"
        overflow
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        // data={props.order.allLastMonthDebtUsers}
        // loading={props.loading}
        title="Total debt for personal orders last month"
        date
        yLabel="Debt"
        xLabel="Date Day"
        overflow
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        // data={props.order.allThisMonthEarningsUniversity}
        // loading={props.loading}
        title="Total spendings for university orders this month"
        date
        yLabel="Spendings"
        xLabel="Date Day"
        overflow
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        // data={props.order.allLastMonthEarningsUniversity}
        // loading={props.loading}
        title="Total spendings for university orders last month"
        date
        yLabel="Spendings"
        xLabel="Date Day"
        overflow
      />
    </GraphSuspense>
    <div className="col-12">
      <div className="card">
        <h2 className="mt-2 mb-2 ml-3">Orders Graphs</h2>
      </div>
    </div>
    <GraphSuspense>
      <OrdersYearByMonth
        // data={props.order.allMonthsUsers}
        // loading={props.loading}
        title="Total Number of Paid Orders for personal By Month in"
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        // data={props.order.allThisMonth}
        // loading={props.loading}
        title="Total Orders this Month"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        // data={props.order.allThisMonthUsers}
        // loading={props.loading}
        title="Total Orders This Month for personal"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        // data={props.order.allThisMonthUniversity}
        // loading={props.loading}
        title="Total Orders this Month for university"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        // data={props.order.allLastMonth}
        // loading={props.loading}
        title="Total Orders Last Month"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        // data={props.order.allLastMonthUsers}
        // loading={props.loading}
        title="Total Orders last Month for personal"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        // data={props.order.allLastMonthUniversity}
        // loading={props.loading}
        title="Total Orders last Month for university"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        // data={props.order.allThisMonthPaidUsers}
        // loading={props.loading}
        title="Total Paid orders for personal this Month"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        // data={props.order.allLastMonthPaidUsers}
        // loading={props.loading}
        title="Total Paid orders for personal last Month"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        // data={props.order.allThisMonthUnpaidUsers}
        // loading={props.loading}
        title="Total unpaid orders for personal this Month"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        // data={props.order.allLastMonthUnpaidUsers}
        // loading={props.loading}
        title="Total unpaid orders for personal last Month"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        // data={props.order.allThisMonthRejected}
        // loading={props.loading}
        title="Total rejected orders this Month"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        // data={props.order.allLastMonthRejected}
        // loading={props.loading}
        title="Total rejected orders last Month"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow
      />
    </GraphSuspense>
  </>
);

export default React.memo(Professors);
