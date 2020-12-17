import jwt from 'jsonwebtoken';
import { Configuration } from '@env';

import { UnauthorizedException, UnknownDictionary } from '@job/common';

export class JWTService {
  private static readonly access_secret =
    Configuration.appConfig.webToken.ACCESS_SECRET;

  private static readonly refresh_secret =
    Configuration.appConfig.webToken.REFRESH_SECRET;

  private constructor() {}

  private static getSecret(refresh: boolean) {
    return !refresh ? JWTService.access_secret : JWTService.refresh_secret;
  }

  private static getExpires(refresh: boolean) {
    return !refresh ? '15m' : '7d';
  }

  static verifyToken(token: string, refresh = false) {
    try {
      return jwt.verify(token, JWTService.getSecret(refresh));
    } catch (error) {
      throw new UnauthorizedException({ message: 'Invalid token...' });
    }
  }

  static signToken<T extends UnknownDictionary>(
    payload: T,
    refresh = false
  ): string {
    return jwt.sign(payload, JWTService.getSecret(refresh), {
      expiresIn: JWTService.getExpires(refresh),
    });
  }
}
