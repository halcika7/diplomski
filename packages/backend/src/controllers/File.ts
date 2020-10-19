import { FileService } from '@service/File';
import { Controller } from '@decorator/class';
import { BaseController } from './Base';
import { Get } from '@decorator/method';
import { Res } from '@decorator/param';
import { Response } from 'express';
import { HTTPCodes } from '@job/common';
import { authMiddleware } from '@middleware/auth';

@Controller('/file')
export class FileController extends BaseController {
  constructor(private readonly fileService: FileService) {
    super();
  }

  @Get('/', authMiddleware(['admin', 'worker']))
  async getFiles(@Res() res: Response) {
    const files = await this.fileService.getAllFilesFromDB();
    return this.sendResponse(res, HTTPCodes.OK, { files });
  }
}
