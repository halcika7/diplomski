import { AnyDictionary } from './Generic';

export type UserRole = 'administration' | 'worker' | 'professor' | 'admin';

export interface Token {
  id: string;
  role: UserRole;
  year: number;
}

export interface User {
  googleID: string;
  name: string;
  picture: string;
  email: string;
  role: string;
  facebookLink: string;
  twitterLink: string;
  phone: string;
  blocked: boolean;
  subscription: AnyDictionary;
  createdAt: Date;
  updatedAt: Date;
}

export interface PersonalInfoBody {
  twitterLink?: string;
  facebookLink?: string;
  phone?: string;
}

export interface AddUserBody {
  email: string;
  role: UserRole;
}
