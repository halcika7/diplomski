import jwt from 'jsonwebtoken';
import { Configuration } from '@env';

import { Token, UnauthorizedException } from '@job/common';

export class JWTService {
  private static readonly access_secret =
    Configuration.appConfig.webToken.ACCESS_SECRET;

  private constructor() {}

  static verifyToken(token: string) {
    try {
      return jwt.verify(token, JWTService.access_secret);
    } catch (err) {
      if (err.message === 'jwt expired') return jwt.decode(token);

      throw new UnauthorizedException({ message: 'Invalid token...' });
    }
  }

  static signToken<T extends Token>(payload: T): string {
    return jwt.sign(payload, JWTService.access_secret, {
      expiresIn: '15m',
    });
  }
}
