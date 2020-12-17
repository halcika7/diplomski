export type PrintType = 'Color' | 'Black/White';

export interface Document {
  path: string;
  pages: number;
  copies: number;
  price: number;
  print: PrintType;
  paper: string;
  binding: string;
  name: string;
}

export interface FileDocument extends Document {
  _id: any;
}

export interface Cart {
  totalCost: number;
}

export interface CartFront extends Cart {
  documents: FileDocument[];
}
