import { Controller } from '@decorator/class';
import { BaseController } from './Base';
import { Get, Post } from '@decorator/method';
import { Req, Res, Cookie } from '@decorator/param';
import { Request, Response } from 'express';
import { CookieService } from '@service/Cookie';
import { HTTPCodes } from '@job/common';
import { Configuration } from '@env';
import { AuthService } from '@service/Auth';

@Controller('/auth')
export class AuthController extends BaseController {
  private readonly cookie = CookieService;

  constructor(private readonly auth: AuthService) {
    super();
  }

  @Post('/logout')
  logout(@Res() res: Response, @Req() req: Request) {
    req.logout();
    req.logOut();
    this.cookie.removeRefreshToken(res);
    return this.sendResponse(res, HTTPCodes.OK, {});
  }

  @Get('/refresh')
  async refreshToken(
    @Cookie(Configuration.appConfig.webToken.REFRESH_TOKEN_NAME) token: string,
    @Res() res: Response
  ) {
    try {
      const { status, refreshToken, ...rest } = await this.auth.refreshToken(
        token
      );

      this.cookie.setRefreshToken(res, refreshToken || '');
      return this.sendResponse(res, 200, { ...rest });
    } catch (error) {
      return this.sendResponse(res, 401, {});
    }
  }
}
