import { HTTPCodes, HTTPDescription } from '../codes';
import { HttpException } from './http.exception';

export class NotImplementedException extends HttpException {
  /**
   * Instantiate a `NotImplementedException` Exception.
   *
   * @example
   * `throw new NotImplementedException()`
   *
   * The HTTP response status code will be 501.
   *
   * @param description string or object describing the error condition.
   * @param error a short description of the HTTP error.
   */
  constructor(objectOrError?: string | object | any) {
    super(
      HttpException.createBody(
        objectOrError,
        HTTPDescription.NOT_IMPLEMENTED,
        HTTPCodes.NOT_IMPLEMENTED
      ),
      HTTPCodes.NOT_IMPLEMENTED,
      HTTPDescription.NOT_IMPLEMENTED
    );
  }
}
