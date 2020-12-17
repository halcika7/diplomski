import { Document } from 'mongoose';
import { Paper } from '@job/common';

export interface PaperInterface extends Paper, Document {}
