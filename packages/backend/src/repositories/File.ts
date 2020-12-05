import File from '@model/File';
import { FileInterface } from '@model/File/File';
import { BaseRepository } from './Base';
import { Injectable } from '@decorator/class';
import { Dictionary } from '../utils/genericTypes';

@Injectable()
export class FilesRepository extends BaseRepository {
  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  addFiles(files: Partial<FileInterface>[]) {
    return files.map(val =>
      this.createModelInstance<Dictionary, FileInterface>(File, val).save()
    );
  }

  getAllFiles() {
    return File.find({}).populate('orderedBy', 'name');
  }
}
