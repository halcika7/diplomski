import { BaseService } from './Base';
import { JWTService } from './JWT';

import { ResponseTokens } from '@ctypes';

import { HTTPCodes, Token, UserRole } from '@job/common';

import { Injectable } from '@decorator/class';
import { UserRepository } from '@repository/User';
import { RedisService } from './Redis';

@Injectable()
export class AuthService extends BaseService {
  private readonly jwt = JWTService;

  private readonly redis = RedisService;

  constructor(private readonly userRepository: UserRepository) {
    super();
  }

  async refreshToken({ id }: Token): Promise<ResponseTokens> {
    const refreshToken = await this.redis.getAsync(id);
    const { role, year } = JWTService.verifyToken(refreshToken, true) as Token;

    const tokenObj = { role, year, id };

    const refresh = this.jwt.signToken(tokenObj, true);

    const valid = this.redis.setValue(id, refresh);

    if (!valid) {
      return this.returnResponseTokens({
        status: HTTPCodes.OK,
        message: '',
        accessToken: '',
      });
    }

    return this.returnResponseTokens({
      status: HTTPCodes.OK,
      message: '',
      accessToken: this.jwt.signToken(tokenObj),
    });
  }

  // only for testing purposes
  async login(role: UserRole) {
    const user = await this.userRepository.findByRole(role);

    if (!user) {
      return this.returnResponseTokens({
        status: HTTPCodes.BAD_REQUEST,
        message: '',
        accessToken: '',
        refreshToken: '',
      });
    }

    const tokenObj = {
      id: user._id,
      role,
      year: new Date(user.createdAt).getFullYear(),
    };

    const accessToken = this.jwt.signToken(tokenObj);

    const refresh = this.jwt.signToken(tokenObj, true);

    const valid = this.redis.setValue(user!._id, refresh);

    if (!valid) {
      return this.returnResponseTokens({
        status: HTTPCodes.OK,
        message: '',
        accessToken: '',
      });
    }

    return this.returnResponseTokens({
      status: HTTPCodes.OK,
      message: '',
      accessToken,
    });
  }
}
