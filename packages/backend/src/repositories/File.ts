import File from '@model/File';
import { FileInterface } from '@model/File/File';
import { BaseRepository } from './Base';
import { Injectable } from '@decorator/class';
import { AnyDictionary } from '@job/common';

@Injectable()
export class FilesRepository extends BaseRepository {
  constructor() {
    super();
  }

  addFiles(files: Partial<FileInterface>[]) {
    return files.map(val =>
      this.createModelInstance<AnyDictionary, FileInterface>(File, val).save()
    );
  }

  getAllFiles() {
    return File.find({}).populate('orderedBy', 'name');
  }
}
