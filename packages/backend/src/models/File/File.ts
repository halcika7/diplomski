import { Document } from 'mongoose';

export interface FileInterface extends Document {
  name: string;
  path: string;
  orderedBy: string;
  createdAt: Date;
  updatedAt: Date;
}
