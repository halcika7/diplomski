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

export interface AddBindingBody {
  name: string;
  upTo25: number;
  from25upTo50: number;
  from50upTo100: number;
  from100upTo150: number;
}

export interface AddPaperBody {
  name: string;
  blackWhitePrinting: {
    upTo250: number;
    from250upTo500: number;
    from500upTo1000: number;
    from1000: number;
  };
  colorPrinting: {
    upTo250: number;
    from250upTo500: number;
    from500upTo1000: number;
    from1000: number;
  };
}

export interface AddUserBody {
  email: string;
  role: string;
}
