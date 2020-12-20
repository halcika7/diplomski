import jwt_decode from 'jwt-decode';

export type DecodedToken = {
  readonly id: string;
  readonly exp: number;
  readonly role: string;
  readonly year: number;
};

export abstract class AuthToken {
  static getRole = (token: string): string => {
    const { role } = jwt_decode<DecodedToken>(token);

    return role as string;
  };

  static getTokenData(token: string) {
    try {
      return jwt_decode<DecodedToken>(token);
    } catch {
      return { id: null, role: null, year: null };
    }
  }
}
