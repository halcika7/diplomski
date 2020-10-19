import path from 'path';
import { getDocument } from 'pdfjs-dist/es5/build/pdf.js';
import { open } from 'yauzl';
import { parse } from 'fast-xml-parser';
import { Injectable } from '@decorator/class';
import { BadRequestException } from '@job/common';

@Injectable()
export class DocumentService {
  private getDocxPageCount(filePath: string) {
    return new Promise((resolve: (val: number) => void, reject) => {
      open(filePath, { lazyEntries: true }, (err, file) => {
        if (err || !file) {
          reject(new Error('Invalid Document'));
        } else {
          file.readEntry();

          file.on('entry', entry => {
            if (entry.fileName === 'docProps/app.xml') {
              file.openReadStream(entry, (_, readStream) => {
                let data = '';

                if (err || !readStream) {
                  reject(new Error('Invalid Document'));
                } else {
                  readStream.on('data', chunk => {
                    data += chunk;
                  });

                  readStream.on('end', () => {
                    const {
                      Properties: { Pages },
                    } = parse(data) as { Properties: { Pages: number } };

                    if (!Pages) {
                      reject(new Error('Invalid Document'));
                    } else {
                      resolve(Pages);
                    }
                  });
                }
              });
            }
            file.readEntry();
          });
        }
      });
    });
  }

  private getPDFPageCount(filePath: string) {
    return new Promise((resolve: (val: number) => void, reject) => {
      getDocument(filePath).promise.then(
        doc => {
          const { numPages } = doc as { numPages: number };
          return resolve(numPages);
        },
        () => {
          reject(new Error('File rejected'));
        }
      );
    });
  }

  getPageCount(filePath: string) {
    const extension = path.extname(filePath).toLowerCase();
    if (extension === '.pdf') {
      return this.getPDFPageCount(filePath);
    }
    if (extension === '.docx') {
      return this.getDocxPageCount(filePath);
    }

    throw new BadRequestException('Extension not supported');
  }
}
