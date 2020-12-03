export interface Token {
  id: string;
  role: string;
}

export interface FileUploadBody {
  print: 'Color' | 'Black/White';
  paper: string;
  copies: string;
  binding: string;
}
