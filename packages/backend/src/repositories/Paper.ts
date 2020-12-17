import Paper from '@model/Paper';
import { PaperInterface } from '@model/Paper/Paper';
import { BaseRepository } from './Base';
import { Injectable } from '@decorator/class';
import {
  UpdateAvailabilityBindingPaper,
  UpdatePriceBindingPaper,
  AnyDictionary,
  BooleanNumberDictionary,
} from '@job/common';

@Injectable()
export class PaperRepository extends BaseRepository {
  constructor() {
    super();
  }

  createPaper(data: Partial<PaperInterface>): PaperInterface {
    return super.createModelInstance<AnyDictionary, PaperInterface>(
      Paper,
      data
    );
  }

  async findByName(name: string) {
    return Paper.findOne({ name });
  }

  async findAll() {
    return Paper.find({}).sort({ name: 1 });
  }

  async getAllNames() {
    return Paper.aggregate([
      { $match: { available: true } },
      { $sort: { name: 1 } },
      { $project: { name: 1, _id: 0 } },
    ]).then(papers => papers.map(paper => paper.name));
  }

  private updateOne(id: string, data: BooleanNumberDictionary) {
    return Paper.updateOne({ _id: id }, { ...data });
  }

  async updatePaperPrice({ id, option, value }: UpdatePriceBindingPaper) {
    return this.updateOne(id, { [option]: value });
  }

  async updateAvailability({ id, available }: UpdateAvailabilityBindingPaper) {
    return this.updateOne(id, { available });
  }
}
