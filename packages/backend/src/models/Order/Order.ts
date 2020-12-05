import { Document } from 'mongoose';

export interface OrderInterface extends Document {
  documents: {
    name: string;
    path: string;
    pages: number;
    copies: number;
    price: number;
    print: string;
    paper: string;
    binding: string;
  }[];
  totalCost: number;
  orderedBy: string | { _id: string; name: string };
  orderedFor: string;
  status: string;
  paid: boolean;
  createdAt: Date;
  updatedAt: Date;
}
