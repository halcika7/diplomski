import { StorageService } from '@service/Storage';
import { DocumentService } from '@service/Document';
import { CartService } from '@service/Cart';
import { FileService } from '@service/File';
import { BaseService } from './Base';
import { Injectable } from '@decorator/class';
import { FileUploadBody } from '@ctypes';
import { BindingRepository } from '@repository/Binding';
import { PaperRepository } from '@repository/Paper';
import { isEmpty, StringDictionary } from '@job/common';

@Injectable()
export class UploadService extends BaseService {
  // eslint-disable-next-line max-params
  constructor(
    private readonly paperRepository: PaperRepository,
    private readonly bindingRepository: BindingRepository,
    private readonly fileService: FileService,
    private readonly cartService: CartService,
    private readonly documentService: DocumentService,
    private readonly storageService: StorageService
  ) {
    super();
  }

  private async fileUploadValidation(
    { binding, copies, paper, print }: FileUploadBody,
    file: Express.Multer.File,
    userId: string,
    pages: number
  ) {
    const errors: StringDictionary = {};
    const validPrints = ['Color', 'Black/White'];
    const numberOfCopies = parseInt(copies, 10);
    const [cart, paperName, bindingName] = await Promise.all([
      this.cartService.getOrCreateCart(userId),
      this.paperRepository.findByName(paper),
      this.bindingRepository.findByName(binding),
    ]);
    const documents = cart!.documents.filter(
      doc =>
        file &&
        doc.name === file.originalname &&
        doc.binding === binding &&
        doc.paper === paper &&
        doc.print === print &&
        doc.pages === pages
    );
    const foundFile = cart!.documents.find(
      doc => file && doc.name === file.originalname && doc.pages === pages
    );

    if (!file) {
      errors.file = 'File is required';
    } else if (
      file.mimetype !==
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document' &&
      file.mimetype !== 'application/pdf'
    ) {
      errors.file = 'The file is not supported';
    } else if (documents.length) {
      errors.file = 'You have already uploaded that file with same options';
    }

    if (!paperName) {
      errors.paperOption = 'Paper Option is invalid';
    }

    if (!bindingName) {
      errors.bindingOption = 'Binding Option is invalid';
    }

    if (!numberOfCopies) {
      errors.numberOfCopies = 'Number of copies is invalid';
    }

    if (!validPrints.includes(print)) {
      errors.printOption = 'Print Option is invalid';
    }

    return {
      errors: isEmpty(errors) ? null : errors,
      paper: paperName,
      binding: bindingName,
      foundFile,
    };
  }

  async uploadFile(
    file: Express.Multer.File,
    body: FileUploadBody,
    userId: string
  ) {
    const pdfPath = file ? await this.fileService.saveDocument(file) : '';
    const pages = pdfPath
      ? await this.documentService.getPageCount(pdfPath)
      : 0;

    if (typeof pages === 'string') {
      return { err: pages };
    }

    const {
      errors,
      binding,
      paper,
      foundFile,
    } = await this.fileUploadValidation(body, file, userId, pages);

    if (errors || !binding || !paper) {
      if (file) {
        this.fileService.removeFile(pdfPath);
      }
      return { errors };
    }

    const zipPath = !foundFile
      ? await this.fileService.uploadZip(file)
      : foundFile.path;

    const { price, err } = await this.fileService.getFilePrice({
      body,
      binding,
      paper,
      path: pdfPath,
    });

    if (err || !pages || !price) {
      if (file) {
        this.fileService.removeFile(pdfPath);
      }
      if (!foundFile && file) {
        this.fileService.removeFile(zipPath);
      }
      return { err };
    }

    const path = !foundFile
      ? await this.storageService.upload(zipPath)
      : foundFile.path;

    const cart = await this.cartService.updateCart(
      {
        pages,
        ...body,
        copies: parseInt(body.copies, 10),
        price,
        path,
        name: file.originalname,
      },
      userId
    );

    this.fileService.removeFile(pdfPath);
    if (!foundFile) {
      this.fileService.removeFile(zipPath);
    }

    return { cart };
  }

  async getBindingPapers() {
    const [papers, bindings] = await Promise.all([
      this.paperRepository.getAllNames(),
      this.bindingRepository.getAllNames(),
    ]);

    return { papers, bindings };
  }
}
