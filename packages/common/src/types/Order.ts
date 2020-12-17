import { FileDocument } from './Cart';

export type OrderType =
  | 'all'
  | 'completed'
  | 'pending'
  | 'rejected'
  | 'approved'
  | 'finished';

export type OrderFor = 'Personal' | 'University';

export interface Order {
  documents: FileDocument[];
  totalCost: number;
  orderedBy: string | { _id: string; name: string };
  orderedFor: string;
  status: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderAggregate {
  _id: string;
  totalCost: number;
  orderedFor: string;
  status: string;
  paid: boolean;
  createdAt: string;
  month: number;
  year: number;
}

export interface OrderCostMonth {
  x: number;
  y: number;
  monthNumber: number;
}

export interface OrderForEarnings {
  Orders: OrderAggregate[];
  completed: OrderAggregate[];
  notPaid: OrderAggregate[];
}

export type CB = (order: OrderAggregate) => boolean;

export interface OrdersByMonths {
  month: number;
  'Number of Orders': number;
  'Total Earnings': number;
  monthNumber: number;
}

export interface FilterOrders {
  status: string | null;
  orderedFor: string | null;
}
