import { Document } from 'mongoose';
import { User } from '@job/common';

export interface UserInterface extends User, Document {}
