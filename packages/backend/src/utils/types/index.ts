import { Request } from 'express';

export * from './ResponseTypes';
export * from './UserTypes';
export interface RequestUser extends Request {
  user: { id: string; role: string };
}
