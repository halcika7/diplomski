export interface Token {
  id: number;
  role: string;
}

export interface FileUploadBody {
  print: 'Color' | 'Black/White';
  paper: string;
  copies: string;
  binding: string;
}
