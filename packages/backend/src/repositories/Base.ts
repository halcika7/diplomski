import { Injectable } from '@decorator/class';
import { Model as MongoModel, Document } from 'mongoose';
import { AnyDictionary } from '@job/common';

@Injectable()
export class BaseRepository {
  protected createModelInstance<U extends AnyDictionary, T extends Document>(
    Model: MongoModel<T>,
    values: U
  ) {
    return new Model({ ...values });
  }
}
