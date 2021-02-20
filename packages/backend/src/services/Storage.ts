import { BaseService } from './Base';
import { Injectable } from '@decorator/class';
import { Storage } from '@google-cloud/storage';
import { basename, join } from 'path';
import { Configuration } from '@env';
import { writeFile, access } from 'fs';
import { promisify } from 'util';

const { environment } = Configuration.appConfig;
const write = promisify(writeFile);
const fileExists = promisify(access);

const keyFilename = join(__dirname, '../../printshop-0684ed36281b.json');

async function check() {
  try {
    await fileExists(keyFilename);
  } catch (error) {
    console.log('🚀 ~ file: Storage.ts ~ line 35 ~ check ~ error', error);
    await write(keyFilename, process.env.GOOGLE_STORAGE as string);
  }
}

if (environment === 'production') {
  check();
}

@Injectable()
export class StorageService extends BaseService {
  private readonly storage: Storage;

  private readonly filesBucket;

  constructor() {
    super();
    this.storage = new Storage({
      projectId: 'printshop',
      keyFilename,
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
