import { HTTPCodes, HTTPDescription } from '../codes';
import { HttpException } from './http.exception';

export class NotFoundException extends HttpException {
  /**
   * Instantiate a `NotFoundException` Exception.
   *
   * @example
   * `throw new NotFoundException()`
   *
   * The HTTP response status code will be 404.
   *
   * @param objectOrError string or object describing the error condition.
   * @param description a short description of the HTTP error.
   */
  constructor(objectOrError?: string | object | any) {
    super(
      HttpException.createBody(
        objectOrError,
        HTTPDescription.NOT_FOUND,
        HTTPCodes.NOT_FOUND
      ),
      HTTPCodes.NOT_FOUND,
      HTTPDescription.NOT_FOUND
    );
  }
}
