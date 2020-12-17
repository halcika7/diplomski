import { Types } from 'mongoose';
import { Token } from '@job/common';

export type ValidValues = string | boolean | null | Types.ObjectId;

export type FindByOrder = Record<string, ValidValues>;

export const months = [
  'null',
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

export type ChartHelper = {
  findBy?: FindByOrder;
  year?: number;
  Data?: { type: string | number; date: { year: number; month: number } };
  user?: Token;
};
