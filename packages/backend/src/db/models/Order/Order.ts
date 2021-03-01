import { Document } from 'mongoose';
import { Order } from '@job/common';

export interface OrderInterface extends Order, Document {}
