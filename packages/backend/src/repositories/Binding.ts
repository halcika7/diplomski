import Binding from '@model/Binding';
import { BindingInterface } from '@model/Binding/Binding';
import { BaseRepository } from './Base';
import { Injectable } from '@decorator/class';
import {
  UpdateAvailabilityBindingPaper,
  UpdatePriceBindingPaper,
  AnyDictionary,
  BooleanNumberDictionary,
} from '@job/common';

@Injectable()
export class BindingRepository extends BaseRepository {
  constructor() {
    super();
  }

  createBinding(data: Partial<BindingInterface>): BindingInterface {
    return super.createModelInstance<AnyDictionary, BindingInterface>(
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
    return Binding.aggregate<{ name: string }>([
      { $match: { available: true } },
      { $sort: { name: 1 } },
      { $project: { name: 1, _id: 0 } },
    ]).then(bdi => bdi.map(binding => binding.name));
  }

  private updateOne(id: string, data: BooleanNumberDictionary) {
    return Binding.updateOne({ _id: id }, { ...data });
  }

  async updateBindingPrice({ id, option, value }: UpdatePriceBindingPaper) {
    return this.updateOne(id, { [option]: value });
  }

  async updateAvailability({ id, available }: UpdateAvailabilityBindingPaper) {
    return this.updateOne(id, { available });
  }
}
