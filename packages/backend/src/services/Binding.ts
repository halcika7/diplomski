import { BindingInterface } from '@model/Binding/Binding';
import { BaseService } from './Base';
import { Injectable } from '@decorator/class';
import {
  UpdateAvailabilityBindingPaper,
  UpdatePriceBindingPaper,
} from '@ctypes';
import { BindingRepository } from '@repository/Binding';

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
}
