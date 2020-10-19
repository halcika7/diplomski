import Paper from '@model/Paper';
import { PaperInterface } from '@model/Paper/Paper';
import { BaseRepository } from './Base';
import { Injectable } from '@decorator/class';
import { Dictionary } from '../utils/genericTypes';

@Injectable()
export class PaperRepository extends BaseRepository {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  createBinding(data: PaperInterface): PaperInterface {
    return super.createModelInstance<Dictionary, PaperInterface>(Paper, data);
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
}
