import { BaseService } from './Base';
import { JWTService } from './JWT';

import { ResponseTokens, Token } from '@ctypes';

import { HTTPCodes } from '@job/common';

import { Injectable } from '@decorator/class';

@Injectable()
export class AuthService extends BaseService {
  private readonly jwt = JWTService;

  // eslint-disable-next-line no-useless-constructor
  constructor() {
    super();
  }

  async refreshToken(token: string): Promise<ResponseTokens> {
    const { id, role } = (await this.jwt.verifyToken(token, true)) as Token;

    return this.returnResponseTokens({
      status: HTTPCodes.OK,
      message: '',
      accessToken: this.jwt.signToken({ id, role }),
      refreshToken: this.jwt.signToken({ id, role }, true),
    });
  }
}
