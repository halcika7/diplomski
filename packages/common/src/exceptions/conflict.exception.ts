import { HTTPCodes, HTTPDescription } from '../codes';
import { HttpException } from './http.exception';

export class ConflictException extends HttpException {
  /**
   * Instantiate a `ConflictException` Exception.
   *
   * @example
   * `throw new ConflictException()`
   *
   * The HTTP response status code will be 409.
   *
   * @param objectOrError string or object describing the error condition.
   * @param description a short description of the HTTP error.
   */
  constructor(objectOrError?: string | object | any) {
    super(
      HttpException.createBody(
        objectOrError,
        HTTPDescription.CONFLICT,
        HTTPCodes.CONFLICT
      ),
      HTTPCodes.CONFLICT,
      HTTPDescription.CONFLICT
    );
  }
}
