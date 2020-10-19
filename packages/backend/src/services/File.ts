import { FilesRepository } from '@repository/File';
import { FileInterface } from '@model/File/File';
import { BaseService } from './Base';
import { Injectable } from '@decorator/class';
import { FileUploadBody } from '@ctypes';
import { DocumentService } from './Document';
import { BindingInterface } from '@model/Binding/Binding';
import { PaperInterface } from '@model/Paper/Paper';

import { gzip } from 'zlib';
import { promisify } from 'util';
import { join } from 'path';
import { writeFile, unlink } from 'fs';
import { PaperService } from './Paper';
import { BindingService } from './Binding';
import { CartDocument } from '@model/Cart/Cart';

const cwd = process.cwd();
const zip = promisify(gzip);
const write = promisify(writeFile);
const unLink = promisify(unlink);

interface GetFilePrice {
  body: FileUploadBody;
  path: string;
  binding: BindingInterface;
  paper: PaperInterface;
}

@Injectable()
export class FileService extends BaseService {
  private readonly directory = join(cwd, 'dist', 'public', 'files', 'temp');

  constructor(
    private readonly documentService: DocumentService,
    private readonly paperService: PaperService,
    private readonly bindingService: BindingService,
    private readonly fileRepository: FilesRepository
  ) {
    super();
  }

  private getPath(
    file: Express.Multer.File,
    directory: string,
    extension = ''
  ) {
    const name = `${new Date().getTime()}${file.originalname}${extension}`;
    const path = join(directory, name);
    return path;
  }

  removeFile(path: string) {
    return unLink(path);
  }

  async getFilePrice({ body, paper, path, binding }: GetFilePrice) {
    try {
      const pages = await this.documentService.getPageCount(path);
      const numberOfCopies = parseInt(body.copies, 10);
      const printOption =
        body.print === 'Black/White' ? 'blackWhitePrinting' : 'colorPrinting';
      const paperPrice = this.paperService.getPaperPrice(
        pages,
        // eslint-disable-next-line security/detect-object-injection
        paper[printOption]
      );

      let price = Number(
        `${Math.round(
          paperPrice * numberOfCopies + (('e+2' as unknown) as number)
        )}e-2`
      );

      if (body.binding) {
        const additionalPrice = this.bindingService.getBindingPrice(
          binding,
          numberOfCopies,
          pages
        );
        price += additionalPrice;
      }
      return {
        pages,
        price: (price.toFixed(2) as unknown) as number,
      };
    } catch (err) {
      if (err.message) return { err: err.message };
      return { err };
    }
  }

  async saveDocument(file: Express.Multer.File) {
    const { buffer } = file;
    const path = this.getPath(file, this.directory);
    await write(path, buffer);
    return path;
  }

  async uploadZip(file: Express.Multer.File) {
    const { buffer } = file;
    const response = await zip(buffer);
    const path = this.getPath(file, this.directory, '.gz');
    await write(path, response as Buffer);
    return path;
  }

  async addFilesToDB(documents: CartDocument[], userId: string) {
    const map = new Map<string, string>();
    documents.forEach(doc => {
      map.set(doc.path, doc.name);
    });

    const files: Partial<FileInterface>[] = [];

    map.forEach((name, path) => {
      files.push({ name, path, orderedBy: userId });
    });

    return this.fileRepository.addFiles(files);
  }

  async getAllFilesFromDB() {
    return this.fileRepository.getAllFiles();
  }
}
