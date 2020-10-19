import { Document, Types } from 'mongoose';

export interface CartDocument {
  _id?: Types.ObjectId;
  path: string;
  pages: number;
  copies: number;
  price: number;
  print: 'Color' | 'Black/White';
  paper: string;
  binding: string;
  name: string;
}

export interface CartData {
  documents: CartDocument[];
  totalCost: number;
  userId: Types.ObjectId;
}

export interface CartInterface extends Document, CartData {}
