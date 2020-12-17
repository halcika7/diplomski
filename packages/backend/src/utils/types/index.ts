import { Request } from 'express';
import { Token } from '@job/common';

export * from './ResponseTypes';
export * from './UserTypes';
export * from './Order';
export interface RequestUser extends Request {
  user: Token;
}
