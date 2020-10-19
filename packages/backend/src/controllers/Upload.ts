import { Controller } from '@decorator/class';
import { BaseController } from './Base';
import { Get, Post } from '@decorator/method';
import { Body, Req, Res } from '@decorator/param';
import { Request, Response } from 'express';
import { HTTPCodes } from '@job/common';
import { authMiddleware } from '@middleware/auth';
import { multerFile } from '@middleware/multer';
import { UploadService } from '@service/Upload';
import { FileUploadBody } from '@ctypes';

@Controller('/upload')
export class UploadController extends BaseController {
  constructor(private readonly uploadService: UploadService) {
    super();
  }

  @Post('/', authMiddleware(['professor']), multerFile)
  async uploadFile(
    @Res() res: Response,
    @Req() req: Request,
    @Body() body: FileUploadBody
  ) {
    const { cart, errors, err } = await this.uploadService.uploadFile(
      req.file,
      body,
      req.user as string
    );

    if (errors) {
      return this.sendResponse(res, HTTPCodes.BAD_REQUEST, { errors });
    }

    if (err) {
      return this.sendResponse(res, HTTPCodes.BAD_REQUEST, { err });
    }

    return this.sendResponse(res, HTTPCodes.OK, { cart });
  }

  @Get('/binding-papers', authMiddleware(['professor']))
  async getBidningPapers(@Res() res: Response) {
    const { papers, bindings } = await this.uploadService.getBidningPapers();

    return this.sendResponse(res, HTTPCodes.OK, { papers, bindings });
  }
}
