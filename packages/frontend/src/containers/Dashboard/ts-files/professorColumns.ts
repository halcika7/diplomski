type Earnings = {
  heading: string;
  name: 'total' | 'user' | 'university' | 'totalDebt';
};

export const earnings: Earnings[] = [
  {
    heading: 'Total spending',
    name: 'total',
  },
  {
    heading: 'Personal spending',
    name: 'user',
  },
  {
    heading: 'University spending',
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
    heading: 'Total personal orders',
    name: 'usersOrders',
  },
  {
    heading: 'Total university orders',
    name: 'universityOrders',
  },
  {
    heading: 'Total completed orders',
    name: 'completedOrders',
  },
  {
    heading: 'Total completed personal orders',
    name: 'completedUser',
  },
  {
    heading: 'Total completed university orders',
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
    heading: 'Total unpaid personal orders',
    name: 'unpaidUser',
  },
];
