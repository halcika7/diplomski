import { BaseService } from './Base';
import { Injectable } from '@decorator/class';
import { PaperRepository } from '@repository/Paper';
import { PaperInterface } from '@model/Paper/Paper';
import {
  isEmpty,
  AddPaperBody,
  UpdateAvailabilityBindingPaper,
  UpdatePriceBindingPaper,
  AnyDictionary,
  NumberDictionary,
  NumberHelper,
  HTTPCodes,
} from '@job/common';

interface PaperPrice {
  upTo250: number;
  from250upTo500: number;
  from500upTo1000: number;
  from1000: number;
}

@Injectable()
export class PaperService extends BaseService {
  private readonly number: NumberHelper;

  constructor(private readonly paperRepository: PaperRepository) {
    super();
    this.number = new NumberHelper();
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
    return this.number.number(price);
  }

  async updatePaperPrice(data: UpdatePriceBindingPaper) {
    if (Number.isNaN(data.value) || data.value <= 0 || !data.value) {
      return this.returnResponse(HTTPCodes.BAD_REQUEST, {
        message: 'Price should be a number and greater than 0',
      });
    }

    const updated = await this.paperRepository.updatePaperPrice(data);

    const modified = !!updated.nModified;

    return this.returnResponse(
      modified ? HTTPCodes.OK : HTTPCodes.BAD_REQUEST,
      {
        message: `Paper ${data.option} was${modified ? '' : ' not'} updated`,
      }
    );
  }

  async updateAvailability(data: UpdateAvailabilityBindingPaper) {
    const updated = await this.paperRepository.updateAvailability(data);
    const modified = !!updated.nModified;

    return this.returnResponse(
      modified ? HTTPCodes.OK : HTTPCodes.BAD_REQUEST,
      {
        message: `Paper ${data.id} was${modified ? '' : ' not'} updated`,
      }
    );
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
    const errors = {} as AnyDictionary;
    const color = {
      upTo250: 0,
      from250upTo500: 0,
      from500upTo1000: 0,
      from1000: 0,
    } as NumberDictionary;
    const black = {
      upTo250: 0,
      from250upTo500: 0,
      from500upTo1000: 0,
      from1000: 0,
    } as NumberDictionary;

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
      return this.returnResponse(HTTPCodes.BAD_REQUEST, { errors });
    }

    await this.paperRepository.createPaper({ ...data, available: true }).save();

    return this.returnResponse(HTTPCodes.OK, { message: 'Paper added' });
  }
}
