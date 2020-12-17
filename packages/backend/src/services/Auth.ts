import { BaseService } from './Base';
import { JWTService } from './JWT';

import { ResponseTokens } from '@ctypes';

import { HTTPCodes, Token } from '@job/common';

import { Injectable } from '@decorator/class';

@Injectable()
export class AuthService extends BaseService {
  private readonly jwt = JWTService;

  constructor() {
    super();
  }

  async refreshToken(token: string): Promise<ResponseTokens> {
    const { id, role, year } = (await this.jwt.verifyToken(
      token,
      true
    )) as Token;

    return this.returnResponseTokens({
      status: HTTPCodes.OK,
      message: '',
      accessToken: this.jwt.signToken({ id, role, year }),
      refreshToken: this.jwt.signToken({ id, role, year }, true),
    });
  }
}
