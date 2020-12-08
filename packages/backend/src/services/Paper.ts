import { BaseService } from './Base';
import { Injectable } from '@decorator/class';
import {
  AddPaperBody,
  UpdateAvailabilityBindingPaper,
  UpdatePriceBindingPaper,
} from '@ctypes';
import { PaperRepository } from '@repository/Paper';
import { PaperInterface } from '@model/Paper/Paper';
import { isEmpty } from '@job/common';

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
    if (Number.isNaN(data.value) || data.value <= 0 || !data.value) {
      return this.returnResponse(400, {
        message: 'Price should be a number and greater than 0',
      });
    }

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

  private getOption(key: string) {
    if (key === 'upTo250') {
      return '250';
    }
    if (key === 'from250upTo500') {
      return '250 - 500';
    }
    if (key === 'from500upTo1000') {
      return '500 - 1000';
    }

    return '1000+';
  }

  private getResponse(key: string) {
    return `price for ${this.getOption(
      key
    )} pages is required and should be greater than 0`;
  }

  private validatePaper(
    { name, blackWhitePrinting, colorPrinting }: AddPaperBody,
    paper: PaperInterface | null
  ) {
    const errors = {} as Record<string, string | any>;
    const color = {
      upTo250: 0,
      from250upTo500: 0,
      from500upTo1000: 0,
      from1000: 0,
    } as Record<string, number>;
    const black = {
      upTo250: 0,
      from250upTo500: 0,
      from500upTo1000: 0,
      from1000: 0,
    } as Record<string, number>;

    if (paper) {
      errors.name = 'Binding with provided name already exists';
    } else if (!name) {
      errors.name = 'Binding name is required';
    }

    Object.entries(blackWhitePrinting).forEach(([key, value]) => {
      black[`${key}`] = 1;

      if (!value || value <= 0) {
        errors.blackWhitePrinting[
          `${key}`
        ] = `Black/White print ${this.getResponse(key)}`;
      }
    });

    Object.entries(colorPrinting).forEach(([key, value]) => {
      color[`${key}`] = 1;

      if (!value || value <= 0) {
        errors.colorPrinting[`${key}`] = `Color print ${this.getResponse(key)}`;
      }
    });

    Object.entries(black).forEach(([key, value]) => {
      if (!value) {
        errors.blackWhitePrinting[
          `${key}`
        ] = `Black/White print ${this.getResponse(key)}`;
      }
    });

    Object.entries(color).forEach(([key, value]) => {
      if (!value) {
        errors.colorPrinting[`${key}`] = `Color print ${this.getResponse(key)}`;
      }
    });

    return { isValid: isEmpty(errors), errors };
  }

  async addPaper(data: AddPaperBody) {
    const found = await this.paperRepository.findByName(data.name);

    const { isValid, errors } = this.validatePaper(data, found);

    if (!isValid) {
      return this.returnResponse(400, { errors });
    }

    await this.paperRepository.createPaper({ ...data, available: true }).save();

    return this.returnResponse(200, { message: 'Paper added' });
  }
}
