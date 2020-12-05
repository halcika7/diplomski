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

export interface PersonalInfoBody {
  twitterLink?: string;
  facebookLink?: string;
  phone?: string;
}

export interface UpdatePriceBindingPaper {
  id: string;
  value: number;
  option: string;
}

export interface UpdateAvailabilityBindingPaper {
  id: string;
  available: boolean;
}
