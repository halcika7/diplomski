type Earnings = {
  heading: string;
  name: 'total' | 'user' | 'university' | 'totalDebt';
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
    | 'unpaidUser';
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
];
