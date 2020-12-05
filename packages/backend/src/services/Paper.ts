import { BaseService } from './Base';
import { Injectable } from '@decorator/class';
import {
  UpdateAvailabilityBindingPaper,
  UpdatePriceBindingPaper,
} from '@ctypes';
import { PaperRepository } from '@repository/Paper';

interface PaperPrice {
  upTo250: number;
  from250upTo500: number;
  from500upTo1000: number;
  from1000: number;
}

@Injectable()
export class PaperService extends BaseService {
  constructor(private readonly paperRepository: PaperRepository) {
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

  async updatePaperPrice(data: UpdatePriceBindingPaper) {
    const updated = await this.paperRepository.updatePaperPrice(data);
    const modified = !!updated.nModified;

    return this.returnResponse(modified ? 200 : 400, {
      message: `Paper ${data.option} was${modified ? '' : ' not'} updated`,
    });
  }

  async updateAvailability(data: UpdateAvailabilityBindingPaper) {
    const updated = await this.paperRepository.updateAvailability(data);
    const modified = !!updated.nModified;

    return this.returnResponse(modified ? 200 : 400, {
      message: `Paper ${data.id} was${modified ? '' : ' not'} updated`,
    });
  }
}
