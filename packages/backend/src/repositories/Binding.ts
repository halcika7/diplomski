import Binding from '@model/Binding';
import { BindingInterface } from '@model/Binding/Binding';
import { BaseRepository } from './Base';
import { Injectable } from '@decorator/class';
import { Dictionary } from '../utils/genericTypes';
import {
  UpdateAvailabilityBindingPaper,
  UpdatePriceBindingPaper,
} from '@ctypes';

@Injectable()
export class BindingRepository extends BaseRepository {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  createBinding(data: BindingInterface): BindingInterface {
    return super.createModelInstance<Dictionary, BindingInterface>(
      Binding,
      data
    );
  }

  async findByName(name: string) {
    return Binding.findOne({ name });
  }

  async findAll() {
    return Binding.find({}).sort({ name: 1 });
  }

  async getAllNames() {
    return Binding.aggregate([
      { $match: { available: true } },
      { $sort: { name: 1 } },
      { $project: { name: 1, _id: 0 } },
    ]).then(bdi => bdi.map(binding => binding.name));
  }

  private updateOne(id: string, data: Record<string, boolean | number>) {
    return Binding.updateOne({ _id: id }, { ...data });
  }

  async updateBindingPrice({ id, option, value }: UpdatePriceBindingPaper) {
    return this.updateOne(id, { [option]: value });
  }

  async updateAvailability({ id, available }: UpdateAvailabilityBindingPaper) {
    return this.updateOne(id, { available });
  }
}
