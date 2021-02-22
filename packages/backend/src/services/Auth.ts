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

  async refreshToken({ id, role, year }: Token): Promise<ResponseTokens> {
    return this.returnResponseTokens({
      status: HTTPCodes.OK,
      message: '',
      accessToken: this.jwt.signToken({ id, role, year }),
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

    return this.returnResponseTokens({
      status: HTTPCodes.OK,
      message: '',
      accessToken,
    });
  }
}
