import { BindingInterface } from '@model/Binding/Binding';
import { BaseService } from './Base';
import { Injectable } from '@decorator/class';
import {
  AddBindingBody,
  UpdateAvailabilityBindingPaper,
  UpdatePriceBindingPaper,
} from '@ctypes';
import { BindingRepository } from '@repository/Binding';
import { isEmpty } from '@job/common';

@Injectable()
export class BindingService extends BaseService {
  constructor(private readonly bindingRepository: BindingRepository) {
    super();
  }

  getBindingPrice(binding: BindingInterface, copies: number, pages: number) {
    let price = 0;
    if (pages < 25) {
      price = binding.upTo25;
    } else if (pages < 50) {
      price = binding.from25upTo50;
    } else if (pages < 100) {
      price = binding.from50upTo100;
    } else if (pages <= 150) {
      price = binding.from100upTo150;
    } else {
      const numberOfSets = Math.floor(pages / 150);
      const remainder = pages % 150;
      price = numberOfSets * binding.from100upTo150;

      if (!remainder) {
        return Number(
          `${Math.round(price * copies + (('e+2' as unknown) as number))}e-2`
        );
      }

      price += this.getBindingPrice(binding, 1, remainder);
    }

    return Number(
      `${Math.round(price * copies + (('e+2' as unknown) as number))}e-2`
    );
  }

  async updateBindingPrice(data: UpdatePriceBindingPaper) {
    if (Number.isNaN(data.value) || data.value <= 0 || !data.value) {
      return this.returnResponse(400, {
        message: 'Price should be a number and greater than 0',
      });
    }

    const updated = await this.bindingRepository.updateBindingPrice(data);
    const modified = !!updated.nModified;

    return this.returnResponse(modified ? 200 : 400, {
      message: `Binding ${data.option} was${modified ? '' : ' not'} updated`,
    });
  }

  async updateAvailability(data: UpdateAvailabilityBindingPaper) {
    const updated = await this.bindingRepository.updateAvailability(data);
    const modified = !!updated.nModified;

    return this.returnResponse(modified ? 200 : 400, {
      message: `Paper ${data.id} was${modified ? '' : ' not'} updated`,
    });
  }

  private validateBinding(
    {
      name,
      upTo25,
      from25upTo50,
      from50upTo100,
      from100upTo150,
    }: AddBindingBody,
    binding: BindingInterface | null
  ) {
    const errors = {} as Record<string, string>;

    if (binding) {
      errors.name = 'Binding with provided name already exists';
    } else if (!name) {
      errors.name = 'Binding name is required';
    }

    if (!upTo25) {
      errors.upTo25 = 'Price for up to 25 pages is required';
    } else if (Number.isNaN(upTo25) || upTo25 <= 0) {
      errors.upTo25 =
        'Price for up to 25 pages should be a number and higher than 0';
    }

    if (!from25upTo50) {
      errors.from25upTo50 = 'Price for 25 - 50 pages is required';
    } else if (Number.isNaN(from25upTo50) || from25upTo50 <= 0) {
      errors.from25upTo50 =
        'Price for 25 - 50 pages should be a number and higher than 0';
    }

    if (!from50upTo100) {
      errors.from50upTo100 = 'Price for 50 - 100 pages is required';
    } else if (Number.isNaN(from50upTo100) || from50upTo100 <= 0) {
      errors.from50upTo100 =
        'Price for 50 - 100 pages should be a number and higher than 0';
    }

    if (!from100upTo150) {
      errors.from100upTo150 = 'Price for 100 - 150 pages is required';
    } else if (Number.isNaN(from100upTo150) || from100upTo150 <= 0) {
      errors.from100upTo150 =
        'Price for 100 - 150 pages should be a number and higher than 0';
    }

    return { isValid: isEmpty(errors), errors };
  }

  async addBinding(data: AddBindingBody) {
    const found = await this.bindingRepository.findByName(data.name);

    const { isValid, errors } = this.validateBinding(data, found);

    if (!isValid) {
      return this.returnResponse(400, { errors });
    }

    await this.bindingRepository
      .createBinding({ ...data, available: true })
      .save();

    return this.returnResponse(200, { message: 'Binding added' });
  }
}
