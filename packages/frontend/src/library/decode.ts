import jwt_decode from 'jwt-decode';

export type DecodedToken = {
  readonly id: number | undefined;
  readonly exp: number;
  readonly role: string | undefined;
};

export class AuthToken {
  readonly decodedToken: DecodedToken = {
    id: undefined,
    exp: 0,
    role: undefined,
  };

  constructor(readonly token?: string) {
    try {
      if (token) this.decodedToken = jwt_decode(token);
    } catch (e) {
      this.decodedToken = {
        id: undefined,
        exp: 0,
        role: undefined,
      };
    }
  }

  private expiresAt(): Date {
    return new Date(this.decodedToken.exp * 1000);
  }

  get isExpired(): boolean {
    return new Date() > this.expiresAt();
  }

  get isAuthenticated(): boolean {
    return !this.isExpired;
  }

  get authorizationString() {
    return `Bearer ${this.token}`;
  }

  static getRole = (token: string): string => {
    const { role } = jwt_decode(token);

    return role;
  };

  static getTokenData(token: string) {
    return jwt_decode(token) as { id: string; role: string };
  }
}
