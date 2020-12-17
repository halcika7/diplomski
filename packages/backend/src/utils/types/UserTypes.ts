import { PrintType } from '@job/common';

export interface FileUploadBody {
  print: PrintType;
  paper: string;
  copies: string;
  binding: string;
}

export type FindByBody = Record<string, string | null>;
