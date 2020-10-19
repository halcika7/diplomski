import { HTTPCodes, HTTPDescription } from '../codes';
import { HttpException } from './http.exception';

export class UnauthorizedException extends HttpException {
  /**
   * Instantiate an `UnauthorizedException` Exception.
   *
   * @example
   * `throw new UnauthorizedException()`
   *
   * The HTTP response status code will be 401.
   *
   * @param objectOrError string or object describing the error condition.
   * @param description a short description of the HTTP error.
   */
  constructor(objectOrError?: string | object | any) {
    super(
      HttpException.createBody(
        objectOrError,
        HTTPDescription.UNAUTHORIZED,
        HTTPCodes.UNAUTHORIZED
      ),
      HTTPCodes.UNAUTHORIZED,
      HTTPDescription.UNAUTHORIZED
    );
  }
}
