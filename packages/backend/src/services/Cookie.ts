import { Response, CookieOptions } from 'express';
import { Configuration } from '@env';

const { environment, webToken } = Configuration.appConfig;

export class CookieService {
  private constructor() {}

  private static readonly _refreshName = webToken.REFRESH_TOKEN_NAME;

  private static readonly refreshOptions: CookieOptions = {
    httpOnly: true,
    path: webToken.REFRESH_TOKEN_PATH,
    sameSite: 'strict',
    secure: environment === 'production',
    domain: environment === 'production' ? '.print-shop-burch.com' : undefined,
  };

  static setRefreshToken = (res: Response, token: string) => {
    res.cookie(CookieService._refreshName, token, CookieService.refreshOptions);
  };

  static removeRefreshToken = (res: Response) => {
    res.cookie(CookieService._refreshName, '', CookieService.refreshOptions);
  };
}
