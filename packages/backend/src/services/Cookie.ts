import { Response, CookieOptions } from 'express';
import { Configuration } from '@env';

export class CookieService {
  private constructor() {}

  private static readonly _refreshName =
    Configuration.appConfig.webToken.REFRESH_TOKEN_NAME;

  private static readonly refreshOptions: CookieOptions = {
    httpOnly: true,
    path: Configuration.appConfig.webToken.REFRESH_TOKEN_PATH,
    sameSite: 'lax',
    secure: Configuration.appConfig.environment === 'production',
  };

  static setRefreshToken = (res: Response, token: string) => {
    res.cookie(CookieService._refreshName, token, CookieService.refreshOptions);
  };

  static removeRefreshToken = (res: Response) => {
    res.cookie(CookieService._refreshName, '', CookieService.refreshOptions);
  };
}
