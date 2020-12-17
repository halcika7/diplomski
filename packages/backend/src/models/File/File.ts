import { Document } from 'mongoose';
import { FileType } from '@job/common';

export interface FileInterface extends FileType, Document {
  orderedBy: string;
}
