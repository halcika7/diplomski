import { BaseService } from './Base';
import { Injectable } from '@decorator/class';

interface PaperPrice {
  upTo250: number;
  from250upTo500: number;
  from500upTo1000: number;
  from1000: number;
}

@Injectable()
export class PaperService extends BaseService {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  getPaperPrice(pages: number, paperOption: PaperPrice) {
    let price = 0;
    if (pages < 250) {
      price = paperOption.upTo250 * pages;
    } else if (pages < 500) {
      price = paperOption.from250upTo500 * pages;
    } else if (pages < 1000) {
      price = paperOption.from500upTo1000 * pages;
    } else if (pages >= 1000) {
      price = paperOption.from1000 * pages;
    }
    return Number(`${Math.round(price + (('e+2' as unknown) as number))}e-2`);
  }
}
