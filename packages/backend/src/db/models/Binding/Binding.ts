import { Document } from 'mongoose';
import { Binding } from '@job/common';

export interface BindingInterface extends Binding, Document {}
