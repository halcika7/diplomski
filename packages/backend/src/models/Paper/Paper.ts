import { Document } from 'mongoose';

export interface PaperInterface extends Document {
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
  available: boolean;
}
