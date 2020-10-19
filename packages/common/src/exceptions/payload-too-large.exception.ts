import { HTTPCodes, HTTPDescription } from '../codes';
import { HttpException } from './http.exception';

export class PayloadTooLargeException extends HttpException {
  /**
   * Instantiate a `PayloadTooLargeException` Exception.
   *
   * @example
   * `throw new PayloadTooLargeException()`
   *
   * The HTTP response status code will be 413.
   *
   * @param objectOrError string or object describing the error condition.
   * @param description a short description of the HTTP error.
   */
  constructor(objectOrError?: string | object | any) {
    super(
      HttpException.createBody(
        objectOrError,
        HTTPDescription.REQUEST_TOO_LONG,
        HTTPCodes.REQUEST_TOO_LONG
      ),
      HTTPCodes.REQUEST_TOO_LONG,
      HTTPDescription.REQUEST_TOO_LONG
    );
  }
}
