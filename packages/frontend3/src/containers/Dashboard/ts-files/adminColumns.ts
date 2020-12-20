type Earnings = {
  heading: string;
  name:
    | 'total'
    | 'user'
    | 'university'
    | 'totalDebt'
    | 'universityDebt'
    | 'userDebt';
};

export const earnings: Earnings[] = [
  {
    heading: 'Total earnings',
    name: 'total',
  },
  {
    heading: 'Earnings from professors',
    name: 'user',
  },
  {
    heading: 'Earnings from university',
    name: 'university',
  },
  {
    heading: 'Total debt',
    name: 'totalDebt',
  },
  {
    heading: 'Debt university',
    name: 'universityDebt',
  },
  {
    heading: 'Debt professors',
    name: 'userDebt',
  },
];

type MonthEarning = {
  heading: string;
  heading2: string;
  name:
    | 'monthEarnings'
    | 'monthEarningsUser'
    | 'monthEarningsUniversity'
    | 'monthDebt'
    | 'monthDebtUser'
    | 'monthDebtUniversity';
};

export const earningsMonth: MonthEarning[] = [
  {
    name: 'monthEarnings',
    heading: 'This month earnings',
    heading2: 'Last month earnings',
  },
  {
    name: 'monthEarningsUser',
    heading: 'This month earnings from university',
    heading2: 'Last month earnings from university',
  },
  {
    name: 'monthEarningsUniversity',
    heading: 'This month earnings from professors',
    heading2: 'Last month earnings from professors',
  },
  {
    name: 'monthDebt',
    heading: 'This month debt',
    heading2: 'Last month debt',
  },
  {
    name: 'monthDebtUser',
    heading: 'This month debt from university',
    heading2: 'Last month debt from university',
  },
  {
    name: 'monthDebtUniversity',
    heading: 'This month debt from professors',
    heading2: 'Last month debt from professors',
  },
];

type Orders = {
  heading: string;
  name:
    | 'orders'
    | 'usersOrders'
    | 'universityOrders'
    | 'completedOrders'
    | 'completedUser'
    | 'completedUniversity'
    | 'rejectedOrders'
    | 'unpaid'
    | 'unpaidUser'
    | 'unpaidUniversity';
};

export const orders: Orders[] = [
  {
    heading: 'Total orders',
    name: 'orders',
  },
  {
    heading: 'Total orders by professors',
    name: 'usersOrders',
  },
  {
    heading: 'Total orders by university',
    name: 'universityOrders',
  },
  {
    heading: 'Total completed orders',
    name: 'completedOrders',
  },
  {
    heading: 'Total completed orders for professors',
    name: 'completedUser',
  },
  {
    heading: 'Total completed orders for university',
    name: 'completedUniversity',
  },
  {
    heading: 'Total rejected orders',
    name: 'rejectedOrders',
  },
  {
    heading: 'Total unpaid orders',
    name: 'unpaid',
  },
  {
    heading: 'Total unpaid orders by professors',
    name: 'unpaidUser',
  },
  {
    heading: 'Total unpaid orders by university',
    name: 'unpaidUniversity',
  },
];

type MonthOrders = {
  heading: string;
  heading2: string;
  icon: string;
  name:
    | 'monthOrders'
    | 'monthOrdersUser'
    | 'monthOrdersUniversity'
    | 'monthCompletedOrders'
    | 'monthCompletedOrdersUser'
    | 'monthCompletedOrdersUniversity'
    | 'monthRejectedOrders'
    | 'monthUnpaidOrders'
    | 'monthUnpaidOrdersUser'
    | 'monthUnpaidOrdersUniversity';
};

export const monthOrders: MonthOrders[] = [
  {
    name: 'monthOrders',
    heading: 'This month total orders',
    heading2: 'Last month total orders',
    icon: 'box',
  },
  {
    name: 'monthOrdersUser',
    heading: 'This month total orders professors',
    heading2: 'Last month total orders professors',
    icon: 'box',
  },
  {
    name: 'monthOrdersUniversity',
    heading: 'This month total orders university',
    heading2: 'Last month total orders university',
    icon: 'box',
  },
  {
    name: 'monthCompletedOrders',
    heading: 'This month completed orders',
    heading2: 'Last month completed orders',
    icon: 'box-check',
  },
  {
    name: 'monthCompletedOrdersUser',
    heading: 'This month completed orders for professors',
    heading2: 'Last month completed orders for professors',
    icon: 'box-check',
  },
  {
    name: 'monthCompletedOrdersUniversity',
    heading: 'This month completed orders for university',
    heading2: 'Last month completed orders for university',
    icon: 'box-check',
  },
  {
    name: 'monthRejectedOrders',
    heading: 'This month rejected orders',
    heading2: 'Last month rejected orders',
    icon: 'box-check',
  },
  {
    name: 'monthUnpaidOrders',
    heading: 'This month unpaid orders',
    heading2: 'Last month unpaid orders',
    icon: 'box-usd',
  },
  {
    name: 'monthUnpaidOrdersUser',
    heading: 'This month unpaid orders by professors',
    heading2: 'Last month unpaid orders by professors',
    icon: 'box-usd',
  },
  {
    name: 'monthUnpaidOrdersUniversity',
    heading: 'This month unpaid orders by university',
    heading2: 'Last month unpaid orders by university',
    icon: 'box-usd',
  },
];
