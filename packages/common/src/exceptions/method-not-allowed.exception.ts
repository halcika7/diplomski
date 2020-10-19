import { HTTPCodes, HTTPDescription } from '../codes';
import { HttpException } from './http.exception';

export class MethodNotAllowedException extends HttpException {
  /**
   * Instantiate a `MethodNotAllowedException` Exception.
   *
   * @example
   * `throw new MethodNotAllowedException()`
   *
   * The HTTP response status code will be 405.
   *
   * @param objectOrError string or object describing the error condition.
   * @param description a short description of the HTTP error.
   */
  constructor(objectOrError?: string | object | any) {
    super(
      HttpException.createBody(
        objectOrError,
        HTTPDescription.METHOD_NOT_ALLOWED,
        HTTPCodes.METHOD_NOT_ALLOWED
      ),
      HTTPCodes.METHOD_NOT_ALLOWED,
      HTTPDescription.METHOD_NOT_ALLOWED
    );
  }
}
