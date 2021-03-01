import { Document, Types } from 'mongoose';
import { Document as Doc, Cart } from '@job/common';

export interface CartDocument extends Doc {
  _id: Types.ObjectId;
}

export interface CartData extends Cart {
  documents: CartDocument[];
  userId: Types.ObjectId;
}

export interface CartInterface extends Document, CartData {}
