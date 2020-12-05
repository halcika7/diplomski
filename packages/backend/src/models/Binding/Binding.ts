import { Document } from 'mongoose';

export interface BindingInterface extends Document {
  name: string;
  upTo25: number;
  from25upTo50: number;
  from50upTo100: number;
  from100upTo150: number;
  available: boolean;
}
