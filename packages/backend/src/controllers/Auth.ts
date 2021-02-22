import { Controller } from '@decorator/class';
import { BaseController } from './Base';
import { Get, Post } from '@decorator/method';
import { Req, Res, Cookie, Body } from '@decorator/param';
import { Request, Response } from 'express';
import { CookieService } from '@service/Cookie';
import { Configuration } from '@env';
import { AuthService } from '@service/Auth';
import { HTTPCodes, NotFoundException, UserRole } from '@job/common';
import { RequestUser } from '@ctypes';
import { authMiddleware } from '@middleware/auth';

const { environment } = Configuration.appConfig;

@Controller('/auth')
export class AuthController extends BaseController {
  private readonly cookie = CookieService;

  constructor(private readonly auth: AuthService) {
    super();
  }

  @Post('/test_login')
  async loginTest(@Res() res: Response, @Body() body: { role: UserRole }) {
    if (environment !== 'test') {
      throw new NotFoundException();
    }

    const { status, ...rest } = await this.auth.login(body.role);

    return this.sendResponse(res, status, { ...rest });
  }

  @Post('/logout')
  logout(@Res() res: Response, @Req() req: Request) {
    req.logout();
    req.logOut();
    this.cookie.removeRefreshToken(res);
    return this.sendResponse(res, HTTPCodes.OK, {});
  }

  @Get('/refresh', authMiddleware())
  async refreshToken(@Res() res: Response, @Req() req: RequestUser) {
    try {
      const { status, ...rest } = await this.auth.refreshToken(req.user);

      return this.sendResponse(res, status, { ...rest });
    } catch {
      return this.sendResponse(res, HTTPCodes.UNAUTHORIZED, {});
    }
  }
}
