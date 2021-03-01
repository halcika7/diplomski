import { Controller } from '@decorator/class';
import { BaseController } from './Base';
import { Get, Post } from '@decorator/method';
import { Req, Res, Cookie, Body, Query } from '@decorator/param';
import { Request, Response } from 'express';
import { CookieService } from '@service/Cookie';
import { Configuration } from '@env';
import { AuthService } from '@service/Auth';
import { HTTPCodes, NotFoundException, UserRole } from '@job/common';
import { LoggerFactory } from '@logger';

const { environment } = Configuration.appConfig;

@Controller('/auth')
export class AuthController extends BaseController {
  private readonly cookie = CookieService;

  private readonly logger = LoggerFactory.getLogger('AuthController');

  constructor(private readonly auth: AuthService) {
    super();
  }

  @Post('/test_login')
  async loginTest(@Res() res: Response, @Body() body: { role: UserRole }) {
    if (environment !== 'test') {
      throw new NotFoundException();
    }

    const { status, refreshToken, ...rest } = await this.auth.login(body.role);

    this.cookie.setRefreshToken(res, refreshToken || '');
    return this.sendResponse(res, status, { ...rest });
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
    @Res() res: Response,
    @Query('firstCheck') check: string
  ) {
    try {
      const { status, refreshToken, ...rest } = await this.auth.refreshToken(
        token
      );

      this.cookie.setRefreshToken(res, refreshToken || '');
      return this.sendResponse(res, status, { ...rest });
    } catch (error) {
      this.logger.error(error, 'refreshToken');
      const status =
        check === 'false' ? HTTPCodes.UNAUTHORIZED : HTTPCodes.BAD_REQUEST;
      return this.sendResponse(res, status, {});
    }
  }
}
