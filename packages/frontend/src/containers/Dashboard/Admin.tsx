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

const Admin = (props: any) => (
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
            value={props.dashboard.earnings + ' KM'}
            heading="Total earnings"
            icon="money-wave"
          />
        </StatsSuspense>
        <StatsSuspense classes="col-6 col-xl-3">
          <Stats
            value={props.dashboard.usersEarnings + ' KM'}
            heading="Total spending by professors"
            icon="money-wave"
          />
        </StatsSuspense>
        <StatsSuspense classes="col-6 col-xl-3">
          <Stats
            value={props.dashboard.universityEarnings + ' KM'}
            heading="Total spending by university"
            icon="money-wave"
          />
        </StatsSuspense>
        <StatsSuspense classes="col-6 col-xl-3">
          <Stats
            value={props.dashboard.debts + ' KM'}
            heading="Total debt by professors and university"
            icon="money-wave"
          />
        </StatsSuspense>
        <StatsSuspense classes="col-6 col-xl-3">
          <Stats
            value={props.dashboard.universityDebt + ' KM'}
            heading="Total debt university"
            icon="money-wave"
          />
        </StatsSuspense>
        <StatsSuspense classes="col-6 col-xl-3">
          <Stats
            value={props.dashboard.usersDebt + ' KM'}
            heading="Total debt users"
            icon="money-wave"
          />
        </StatsSuspense>
        <StatsPercentageSuspense classes="col-6 col-xl-3">
          <StatsWithPercentage
            value={props.dashboard.thisMonthEarnings}
            oldValue={props.dashboard.lastMonthEarnings}
            heading="This month earnings"
            heading2="Last month earnings"
            icon="money-wave"
            price={true}
          />
        </StatsPercentageSuspense>
        <StatsPercentageSuspense classes="col-6 col-xl-3">
          <StatsWithPercentage
            value={props.dashboard.thisMonthEarningsUniversity}
            oldValue={props.dashboard.lastMonthEarningsUniversity}
            heading="This month spending university"
            heading2="Last month spending university"
            icon="money-wave"
            price={true}
          />
        </StatsPercentageSuspense>
        <StatsPercentageSuspense classes="col-6 col-xl-3">
          <StatsWithPercentage
            value={props.dashboard.thisMonthEarningsProfessors}
            oldValue={props.dashboard.lastMonthEarningsProfessors}
            heading="This month spending professors"
            heading2="Last month spending professors"
            icon="money-wave"
            price={true}
          />
        </StatsPercentageSuspense>
        <StatsPercentageSuspense classes="col-6 col-xl-3">
          <StatsWithPercentage
            value={props.dashboard.thisMonthDebt}
            oldValue={props.dashboard.lastMonthDebt}
            heading="This month debt"
            heading2="Last month debt"
            icon="money-wave"
            price={true}
          />
        </StatsPercentageSuspense>
        <StatsPercentageSuspense classes="col-6 col-xl-3">
          <StatsWithPercentage
            value={props.dashboard.thisMonthEarningsUniversity}
            oldValue={props.dashboard.lastMonthEarningsUniversity}
            heading="This month debt university"
            heading2="Last month debt university"
            icon="money-wave"
            price={true}
          />
        </StatsPercentageSuspense>
        <StatsPercentageSuspense classes="col-6 col-xl-3">
          <StatsWithPercentage
            value={props.dashboard.thisMonthDebtProfessors}
            oldValue={props.dashboard.lastMonthDebtProfessors}
            heading="This month debt professors"
            heading2="Last month debt professors"
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
            value={props.dashboard.orders}
            heading="Total orders"
            icon="box"
          />
        </StatsSuspense>
        <StatsSuspense classes="col-6 col-xl-3">
          <Stats
            value={props.dashboard.usersOrders}
            heading="Total orders by professors"
            icon="box"
          />
        </StatsSuspense>
        <StatsSuspense classes="col-6 col-xl-3">
          <Stats
            value={props.dashboard.universityOrders}
            heading="Total orders by university"
            icon="box"
          />
        </StatsSuspense>
        <StatsSuspense classes="col-6 col-xl-3">
          <Stats
            value={props.dashboard.finishedOrders}
            heading="Total finished orders"
            icon="box"
          />
        </StatsSuspense>
        <StatsSuspense classes="col-6 col-xl-3">
          <Stats
            value={props.dashboard.usersFinishedOrders}
            heading="Total finished orders for professors"
            icon="box"
          />
        </StatsSuspense>
        <StatsSuspense classes="col-6 col-xl-3">
          <Stats
            value={props.dashboard.universityFinishedOrders}
            heading="Total finished orders for university"
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
        <StatsSuspense classes="col-6 col-xl-3">
          <Stats
            value={props.dashboard.paidOrders}
            heading="Total paid orders"
            icon="box"
          />
        </StatsSuspense>
        <StatsSuspense classes="col-6 col-xl-3">
          <Stats
            value={props.dashboard.usersPaidOrders}
            heading="Total paid orders by professors"
            icon="box"
          />
        </StatsSuspense>
        <StatsSuspense classes="col-6 col-xl-3">
          <Stats
            value={props.dashboard.universityPaidOrders}
            heading="Total paid orders by university"
            icon="box"
          />
        </StatsSuspense>
        <StatsSuspense classes="col-6 col-xl-3">
          <Stats
            value={props.dashboard.unpaidOrders}
            heading="Total unpaid orders"
            icon="box"
          />
        </StatsSuspense>
        <StatsSuspense classes="col-6 col-xl-3">
          <Stats
            value={props.dashboard.usersUnpaidOrders}
            heading="Total unpaid orders by professors"
            icon="box"
          />
        </StatsSuspense>
        <StatsSuspense classes="col-6 col-xl-3">
          <Stats
            value={props.dashboard.universityUnpaidOrders}
            heading="Total unpaid orders by university"
            icon="box"
          />
        </StatsSuspense>
        <StatsPercentageSuspense classes="col-6 col-xl-3">
          <StatsWithPercentage
            value={props.dashboard.thisOrders}
            oldValue={props.dashboard.lastOrders}
            heading="This month total orders"
            heading2="Last month total orders"
            icon="box"
          />
        </StatsPercentageSuspense>
        <StatsPercentageSuspense classes="col-6 col-xl-3">
          <StatsWithPercentage
            value={props.dashboard.thisOrdersUsers}
            oldValue={props.dashboard.lastOrdersUsers}
            heading="This month total orders professors"
            heading2="Last month total orders professors"
            icon="box"
          />
        </StatsPercentageSuspense>
        <StatsPercentageSuspense classes="col-6 col-xl-3">
          <StatsWithPercentage
            value={props.dashboard.thisOrdersUniversity}
            oldValue={props.dashboard.lastOrdersUniversity}
            heading="This month total orders university"
            heading2="Last month total orders university"
            icon="box"
          />
        </StatsPercentageSuspense>
        <StatsPercentageSuspense classes="col-6 col-xl-3">
          <StatsWithPercentage
            value={props.dashboard.thisFinishedOrders}
            oldValue={props.dashboard.lastFinishedOrders}
            heading="This month finished orders"
            icon="box-check"
            heading2="Last month finished orders"
          />
        </StatsPercentageSuspense>
        <StatsPercentageSuspense classes="col-6 col-xl-3">
          <StatsWithPercentage
            value={props.dashboard.thisFinishedOrdersUsers}
            oldValue={props.dashboard.lastFinishedOrdersUsers}
            heading="This month finished orders for professors"
            icon="box-check"
            heading2="Last month finished orders for professors"
          />
        </StatsPercentageSuspense>
        <StatsPercentageSuspense classes="col-6 col-xl-3">
          <StatsWithPercentage
            value={props.dashboard.thisFinishedOrdersUniversity}
            oldValue={props.dashboard.lastFinishedOrdersUniversity}
            heading="This month finished orders for university"
            icon="box-check"
            heading2="Last month finished orders for university"
          />
        </StatsPercentageSuspense>
        <StatsPercentageSuspense classes="col-6 col-xl-3">
          <StatsWithPercentage
            value={props.dashboard.thisRejectedOrders}
            oldValue={props.dashboard.lastRejectedOrders}
            heading="This month rejected orders"
            icon="box-check"
            heading2="Last month rejected orders"
          />
        </StatsPercentageSuspense>
        <StatsPercentageSuspense classes="col-6 col-xl-3">
          <StatsWithPercentage
            value={props.dashboard.thisPaidOrders}
            oldValue={props.dashboard.lastPaidOrders}
            heading="This month paid orders"
            heading2="Last month paid orders"
            icon="box-usd"
          />
        </StatsPercentageSuspense>
        <StatsPercentageSuspense classes="col-6 col-xl-3">
          <StatsWithPercentage
            value={props.dashboard.thisPaidOrdersUsers}
            oldValue={props.dashboard.lastPaidOrdersUsers}
            heading="This month paid orders by professors"
            heading2="Last month paid orders by professors"
            icon="box-usd"
          />
        </StatsPercentageSuspense>
        <StatsPercentageSuspense classes="col-6 col-xl-3">
          <StatsWithPercentage
            value={props.dashboard.thisPaidOrdersUniversity}
            oldValue={props.dashboard.lastPaidOrdersUniversity}
            heading="This month paid orders by university"
            heading2="Last month paid orders by university"
            icon="box-usd"
          />
        </StatsPercentageSuspense>
        <StatsPercentageSuspense classes="col-6 col-xl-3">
          <StatsWithPercentage
            value={props.dashboard.thisUnpaidOrders}
            oldValue={props.dashboard.lastUnpaidOrders}
            heading="This month unpaid orders"
            heading2="Last month unpaid orders"
            icon="box-usd"
          />
        </StatsPercentageSuspense>
        <StatsPercentageSuspense classes="col-6 col-xl-3">
          <StatsWithPercentage
            value={props.dashboard.thisUnpaidOrdersUsers}
            oldValue={props.dashboard.lastUnpaidOrdersUsers}
            heading="This month unpaid orders by professors"
            heading2="Last month unpaid orders by professors"
            icon="box-usd"
          />
        </StatsPercentageSuspense>
        <StatsPercentageSuspense classes="col-6 col-xl-3">
          <StatsWithPercentage
            value={props.dashboard.thisUnpaidOrdersUniversity}
            oldValue={props.dashboard.lastUnpaidOrdersUniversity}
            heading="This month unpaid orders by university"
            heading2="Last month unpaid orders by university"
            icon="box-usd"
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
        data={props.order.allMonthsEarning}
        loading={props.loading}
        title="Total Earnings By Month"
        date
        yLabel="Earnings"
        xLabel="Month"
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allMonthsEarningUsers}
        loading={props.loading}
        title="Total Earnings By Month from Professors"
        date
        yLabel="Earnings"
        xLabel="Month"
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allMonthsEarningUniversity}
        loading={props.loading}
        title="Total Earnings By Month from University"
        date
        yLabel="Earnings"
        xLabel="Month"
      />
    </GraphSuspense>

    <GraphSuspense>
      <Earnings
        data={props.order.allThisMonthEarnings}
        loading={props.loading}
        title="Total Earning This Month"
        yLabel="Earnings"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allThisMonthEarningsUsers}
        loading={props.loading}
        title="Total Earning This Month from Professors"
        yLabel="Earnings"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allThisMonthEarningsUniversity}
        loading={props.loading}
        title="Total Earning This Month from University"
        yLabel="Earnings"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>

    <GraphSuspense>
      <Earnings
        data={props.order.allThisMonthDebt}
        loading={props.loading}
        title="Total Debt This Month"
        yLabel="Debt"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allThisMonthDebtUsers}
        loading={props.loading}
        title="Total Debt This Month from Professors"
        yLabel="Debt"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allThisMonthDebtUniversity}
        loading={props.loading}
        title="Total Debt This Month from University"
        yLabel="Debt"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allLastMonthEarnings}
        loading={props.loading}
        title="Total Earning Last Month"
        yLabel="Earnings"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allLastMonthEarningsUsers}
        loading={props.loading}
        title="Total Earning Last Month from Professors"
        yLabel="Earnings"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allLastMonthEarningsUniversity}
        loading={props.loading}
        title="Total Earning Last Month from University"
        yLabel="Earnings"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>

    <GraphSuspense>
      <Earnings
        data={props.order.allLastMonthDebt}
        loading={props.loading}
        title="Total Debt Last Month"
        yLabel="Debt"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allLastMonthDebtUsers}
        loading={props.loading}
        title="Total Debt Last Month from Professors"
        yLabel="Debt"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allLastMonthDebtUniversity}
        loading={props.loading}
        title="Total Debt Last Month from University"
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
        data={props.order.allMonths}
        loading={props.loading}
        title="Total Number of Paid Orders By Month in"
      />
    </GraphSuspense>
    <GraphSuspense>
      <OrdersYearByMonth
        data={props.order.allMonthsUsers}
        loading={props.loading}
        title="Total Number of Paid Orders from Professors By Month in"
      />
    </GraphSuspense>
    <GraphSuspense>
      <OrdersYearByMonth
        data={props.order.allMonthsUniversity}
        loading={props.loading}
        title="Total Number of Paid Orders from University By Month in"
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allThisMonth}
        loading={props.loading}
        title="Total Orders this Month"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allThisMonthUsers}
        loading={props.loading}
        title="Total Orders this Month by Professors"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allThisMonthUniversity}
        loading={props.loading}
        title="Total Orders this Month by University"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allThisMonthFinished}
        loading={props.loading}
        title="Total Finished Orders this Month"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allThisMonthFinishedUsers}
        loading={props.loading}
        title="Total Finished Orders this Month by Professors"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allThisMonthFinishedUniversity}
        loading={props.loading}
        title="Total Finished Orders this Month by University"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allThisMonthPaid}
        loading={props.loading}
        title="Total Paid Orders this Month"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allThisMonthPaidUsers}
        loading={props.loading}
        title="Total Paid Orders this Month by Professors"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allThisMonthPaidUniversity}
        loading={props.loading}
        title="Total Paid Orders this Month by University"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allThisMonthUnpaid}
        loading={props.loading}
        title="Total Unpaid Orders this Month"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allThisMonthUnpaidUsers}
        loading={props.loading}
        title="Total Unpaid Orders this Month by Professors"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allThisMonthUnpaidUniversity}
        loading={props.loading}
        title="Total Unpaid Orders this Month by University"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allThisMonthRejected}
        loading={props.loading}
        title="Total Rejected Orders this"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allLastMonth}
        loading={props.loading}
        title="Total Orders Last Month"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allLastMonthUsers}
        loading={props.loading}
        title="Total Orders Last Month by Professors"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allLastMonthUniversity}
        loading={props.loading}
        title="Total Orders Last Month by University"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allLastMonthFinished}
        loading={props.loading}
        title="Total Finished Orders Last Month"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allLastMonthFinishedUsers}
        loading={props.loading}
        title="Total Finished Orders Last Month by Professors"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allLastMonthFinishedUniversity}
        loading={props.loading}
        title="Total Finished Orders Last Month by University"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allLastMonthPaid}
        loading={props.loading}
        title="Total Paid Orders Last Month"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allLastMonthPaidUsers}
        loading={props.loading}
        title="Total Paid Orders Last Month by Professors"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allLastMonthPaidUniversity}
        loading={props.loading}
        title="Total Paid Orders Last Month by University"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allLastMonthUnpaid}
        loading={props.loading}
        title="Total Unpaid Orders Last Month"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allLastMonthUnpaidUsers}
        loading={props.loading}
        title="Total Unpaid Orders Last Month by Professors"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allLastMonthUnpaidUniversity}
        loading={props.loading}
        title="Total Unpaid Orders Last Month by University"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
    <GraphSuspense>
      <Earnings
        data={props.order.allLastMonthRejected}
        loading={props.loading}
        title="Total Rejected Orders Last"
        yLabel="Number of Orders"
        xLabel="Date Day"
        overflow={true}
      />
    </GraphSuspense>
  </>
);

export default React.memo(Admin);
