import { BaseService } from './Base';
import { Injectable } from '@decorator/class';
import { Storage } from '@google-cloud/storage';
import { basename, join } from 'path';

@Injectable()
export class StorageService extends BaseService {
  private readonly storage: Storage;

  private readonly filesBucket;

  constructor() {
    super();
    this.storage = new Storage({
      projectId: 'printshop',
      keyFilename: join(__dirname, '../../printshop-0684ed36281b.json'),
    });
    this.filesBucket = this.storage.bucket('printshop-files');
  }

  private getPublicUrl(filename: string) {
    return `https://storage.googleapis.com/printshop-files/${filename}`;
  }

  async upload(path: string) {
    const fileName = basename(path);
    const file = this.filesBucket.file(fileName);

    await this.filesBucket.upload(path, {
      resumable: false,
      gzip: true,
      validation: false,
    });

    await file.makePublic();

    return this.getPublicUrl(fileName);
  }

  async delete(path: string) {
    const name = path.split('/printshop-files/')[1];

    return this.storage.bucket('printshop-files').file(name).delete();
  }
}
