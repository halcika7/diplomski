import { Controller } from '@decorator/class';
import { BaseController } from './Base';
import { Get, Patch, Post } from '@decorator/method';
import { Body, Param, Req, Res } from '@decorator/param';
import { Response } from 'express';
import { HTTPCodes } from '@job/common';
import { authMiddleware } from '@middleware/auth';
import { UserService } from '@service/User';
import { multerImage } from '@middleware/multer';
import { AddUserBody, RequestUser } from '@ctypes';

@Controller('/user')
export class UserController extends BaseController {
  constructor(private readonly userService: UserService) {
    super();
  }

  @Get('/', authMiddleware())
  async getUserData(@Res() res: Response, @Req() req: RequestUser) {
    const userData = await this.userService.getUserData(req.user.id);

    return this.sendResponse(res, HTTPCodes.OK, { userData });
  }

  @Post('/picture', authMiddleware(), multerImage)
  async updatePicture(@Res() res: Response, @Req() req: RequestUser) {
    const { error, secure_url } = await this.userService.changePhoto(
      req.file,
      req.user.id
    );

    if (error) {
      return this.sendResponse(res, HTTPCodes.BAD_REQUEST, { error });
    }

    return this.sendResponse(res, HTTPCodes.OK, { url: secure_url });
  }

  @Patch('/', authMiddleware())
  async updatePersonalInfo(
    @Res() res: Response,
    @Req() req: RequestUser,
    @Body() info: any
  ) {
    const {
      status,
      message,
      errors,
    } = await this.userService.updatePersonalInfo(info, req.user.id);

    return this.sendResponse(res, status, { message, errors });
  }

  @Patch('/:role/:id', authMiddleware(['admin']))
  async updateUserRole(
    @Res() res: Response,
    @Param('role') role: string,
    @Param('id') id: string
  ) {
    const { status, message } = await this.userService.updateUserRole(role, id);

    return this.sendResponse(res, status, { message });
  }

  @Patch('/status/:blocked/:id', authMiddleware(['admin']))
  async updateUserBlockedStatus(
    @Res() res: Response,
    @Param('blocked') blocked: string,
    @Param('id') id: string
  ) {
    const { status, message } = await this.userService.updateUserBlockedStatus(
      blocked === 'true',
      id
    );

    return this.sendResponse(res, status, { message });
  }

  @Get('/:role', authMiddleware(['worker', 'admin']))
  async getUsersByRole(@Res() res: Response, @Param('role') role: string) {
    const users = await this.userService.getUsersByRole(role);

    return this.sendResponse(res, HTTPCodes.OK, { users });
  }

  @Get('/edit/:id', authMiddleware(['worker', 'admin']))
  async getUser(@Res() res: Response, @Param('id') id: string) {
    try {
      const user = await this.userService.getUserToEdit(id);

      if (!user) {
        return this.sendResponse(res, HTTPCodes.NOT_FOUND, {
          message: 'User not found',
        });
      }

      return this.sendResponse(res, HTTPCodes.OK, { user });
    } catch (error) {
      return this.sendResponse(res, HTTPCodes.NOT_FOUND, {
        message: 'User not found',
      });
    }
  }

  @Post('/add', authMiddleware(['admin']))
  async addUser(@Res() res: Response, @Body() body: AddUserBody) {
    const { status, ...rest } = await this.userService.addUser(body);

    return this.sendResponse(res, status, { ...rest });
  }
}
