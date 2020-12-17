export interface BlackWhitePrinting {
  upTo250: number;
  from250upTo500: number;
  from500upTo1000: number;
  from1000: number;
}

export interface ColorPrinting {
  upTo250: number;
  from250upTo500: number;
  from500upTo1000: number;
  from1000: number;
}

export interface Paper {
  name: string;
  blackWhitePrinting: BlackWhitePrinting;
  colorPrinting: ColorPrinting;
  available: boolean;
}

export interface PaperFront extends Paper {
  _id: string;
}

export interface Binding {
  name: string;
  upTo25: number;
  from25upTo50: number;
  from50upTo100: number;
  from100upTo150: number;
  available: boolean;
}

export interface BindingFront extends Binding {
  _id: string;
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
  blackWhitePrinting: BlackWhitePrinting;
  colorPrinting: ColorPrinting;
}

export interface BindingErrors {
  name: string;
  upTo25: string;
  from25upTo50: string;
  from50upTo100: string;
  from100upTo150: string;
}

export interface PaperErrors {
  name: string;
  blackWhitePrinting: {
    upTo250: string;
    from250upTo500: string;
    from500upTo1000: string;
    from1000: string;
  };
  colorPrinting: {
    upTo250: string;
    from250upTo500: string;
    from500upTo1000: string;
    from1000: string;
  };
}

export type PaperBinding = 'paper' | 'binding';

export interface UpdatePriceBindingPaper {
  id: string;
  value: number;
  option: string;
}

export interface UpdateAvailabilityBindingPaper {
  id: string;
  available: boolean;
}
