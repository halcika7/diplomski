import { Controller } from '@decorator/class';
import { BaseController } from './Base';
import { Get, Put } from '@decorator/method';
import { Body, Req, Res } from '@decorator/param';
import { Response } from 'express';
import { HTTPCodes } from '@job/common';
import { authMiddleware } from '@middleware/auth';
import { multerFile } from '@middleware/multer';
import { UploadService } from '@service/Upload';
import { FileUploadBody, RequestUser } from '@ctypes';

@Controller('/upload')
export class UploadController extends BaseController {
  constructor(private readonly uploadService: UploadService) {
    super();
  }

  @Put('/', authMiddleware(['professor']), multerFile)
  async uploadFile(
    @Res() res: Response,
    @Req() req: RequestUser,
    @Body() body: FileUploadBody
  ) {
    try {
      const { cart, errors, err } = await this.uploadService.uploadFile(
        req.file,
        body,
        req.user.id
      );

      if (errors) {
        return this.sendResponse(res, HTTPCodes.BAD_REQUEST, { errors });
      }

      if (err) {
        return this.sendResponse(res, HTTPCodes.BAD_REQUEST, { err });
      }

      return this.sendResponse(res, HTTPCodes.OK, { cart });
    } catch (err) {
      return this.sendResponse(res, HTTPCodes.BAD_REQUEST, { err });
    }
  }

  @Get('/binding-papers', authMiddleware(['professor']))
  async getBindingPapers(@Res() res: Response) {
    const { papers, bindings } = await this.uploadService.getBindingPapers();

    return this.sendResponse(res, HTTPCodes.OK, { papers, bindings });
  }
}
