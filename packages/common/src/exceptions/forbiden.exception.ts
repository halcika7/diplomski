import { HTTPCodes, HTTPDescription } from '../codes';
import { HttpException } from './http.exception';

export class ForbiddenException extends HttpException {
  /**
   * Instantiate a `ForbiddenException` Exception.
   *
   * @example
   * `throw new ForbiddenException()`
   *
   * The HTTP response status code will be 403.
   *
   * @param objectOrError string or object describing the error condition.
   * @param description a short description of the HTTP error.
   */
  constructor(objectOrError?: string | object | any) {
    super(
      HttpException.createBody(
        objectOrError,
        HTTPDescription.FORBIDDEN,
        HTTPCodes.FORBIDDEN
      ),
      HTTPCodes.FORBIDDEN,
      HTTPDescription.FORBIDDEN
    );
  }
}
