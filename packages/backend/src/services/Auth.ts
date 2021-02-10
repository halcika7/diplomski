import { BaseService } from './Base';
import { JWTService } from './JWT';

import { ResponseTokens } from '@ctypes';

import { HTTPCodes, Token, UserRole } from '@job/common';

import { Injectable } from '@decorator/class';
import { UserRepository } from '@repository/User';

@Injectable()
export class AuthService extends BaseService {
  private readonly jwt = JWTService;

  constructor(private readonly userRepository: UserRepository) {
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
    const accessToken = this.jwt.signToken({
      id: user._id,
      role,
      year: new Date(user.createdAt).getFullYear(),
    });

    const refreshToken = this.jwt.signToken(
      { id: user._id, role, year: new Date(user.createdAt).getFullYear() },
      true
    );

    return this.returnResponseTokens({
      status: HTTPCodes.OK,
      message: '',
      accessToken,
      refreshToken,
    });
  }
}
