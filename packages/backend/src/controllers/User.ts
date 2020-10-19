import { Controller } from '@decorator/class';
import { BaseController } from './Base';
import { Get, Patch, Post } from '@decorator/method';
import { Body, Param, Req, Res } from '@decorator/param';
import { Request, Response } from 'express';
import { HTTPCodes } from '@job/common';
import { authMiddleware } from '@middleware/auth';
import { UserService } from '@service/User';
import { multerImage } from '@middleware/multer';

@Controller('/user')
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Get('/', authMiddleware())
  async getUserData(@Res() res: Response, @Req() req: Request) {
    const userData = await this.userService.getUserData(req.user as string);
    return this.sendResponse(res, HTTPCodes.OK, { userData });
  }

  @Post('/picture', authMiddleware(), multerImage)
  async updatePicture(@Res() res: Response, @Req() req: Request) {
    const { error, secure_url } = await this.userService.changePhoto(
      req.file,
      req.user as string
    );

    if (error) {
      return this.sendResponse(res, HTTPCodes.BAD_REQUEST, { error });
    }

    return this.sendResponse(res, HTTPCodes.OK, { url: secure_url });
  }

  // @Patch('/', authMiddleware())
  // updatePeronalInfo(
  //   @Res() res: Response,
  //   @Req() req: Request,
  //   @Body() body: any
  // ) {}

  @Get('/:role', authMiddleware(['worker', 'admin']))
  async getUsersByRole(@Res() res: Response, @Param('role') role: string) {
    const users = await this.userService.getUsersByRole(role);

    return this.sendResponse(res, HTTPCodes.OK, { users });
  }
}
