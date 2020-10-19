import { Document } from 'mongoose';

export interface UserInterface extends Document {
  googleID: string;
  name: string;
  picture: string;
  email: string;
  role: string;
  facebookLink: string;
  twitterLink: string;
  phone: string;
  blocked: boolean;
  subscription: Record<string, any>;
}
