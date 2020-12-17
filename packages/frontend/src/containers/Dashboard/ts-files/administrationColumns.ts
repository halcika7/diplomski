type Earnings = {
  heading: string;
  name: 'total' | 'totalDebt';
};

export const earnings: Earnings[] = [
  {
    heading: 'Total earnings',
    name: 'total',
  },
  {
    heading: 'Total debt',
    name: 'totalDebt',
  },
];

type Orders = {
  heading: string;
  name: 'orders' | 'completedOrders' | 'rejectedOrders' | 'unpaid';
};

export const orders: Orders[] = [
  {
    heading: 'Total orders',
    name: 'orders',
  },
  {
    heading: 'Total completed orders',
    name: 'completedOrders',
  },
  {
    heading: 'Total rejected orders',
    name: 'rejectedOrders',
  },
  {
    heading: 'Total unpaid orders',
    name: 'unpaid',
  },
];
