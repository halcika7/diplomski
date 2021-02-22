import { Controller } from '@decorator/class';
import { BaseController } from './Base';
import { Get, Post } from '@decorator/method';
import { Req, Res, Body } from '@decorator/param';
import { Response } from 'express';
import { Configuration } from '@env';
import { AuthService } from '@service/Auth';
import { HTTPCodes, NotFoundException, UserRole } from '@job/common';
import { RequestUser } from '@ctypes';
import { RedisService } from '@service/Redis';
import { appendToken } from '@middleware/appendToken';

const { environment } = Configuration.appConfig;

@Controller('/auth')
export class AuthController extends BaseController {
  private readonly redis = RedisService;

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

  @Post('/logout', appendToken())
  logout(@Res() res: Response, @Req() req: RequestUser) {
    this.redis.setValue(req.user.id, '');
    req.logout();
    req.logOut();
    return this.sendResponse(res, HTTPCodes.OK, {});
  }

  @Get('/refresh', appendToken())
  async refreshToken(@Res() res: Response, @Req() req: RequestUser) {
    try {
      const { status, ...rest } = await this.auth.refreshToken(req.user);

      return this.sendResponse(res, status, { ...rest });
    } catch {
      return this.sendResponse(res, HTTPCodes.UNAUTHORIZED, {});
    }
  }
}
