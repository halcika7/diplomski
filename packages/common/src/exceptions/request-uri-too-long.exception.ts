import { HTTPCodes, HTTPDescription } from '../codes';
import { HttpException } from './http.exception';

export class RequestUriTooLongException extends HttpException {
  /**
   * Instantiate a `RequestUriTooLongException` Exception.
   *
   * @example
   * `throw new RequestUriTooLongException()`
   *
   * @usageNotes
   * The HTTP response status code will be 414.
   *
   * @param objectOrError string or object describing the error condition.
   * @param description a short description of the HTTP error.
   */
  constructor(objectOrError?: string | object | any) {
    super(
      HttpException.createBody(
        objectOrError,
        HTTPDescription.REQUEST_URI_TOO_LONG,
        HTTPCodes.REQUEST_URI_TOO_LONG
      ),
      HTTPCodes.REQUEST_URI_TOO_LONG,
      HTTPDescription.REQUEST_URI_TOO_LONG
    );
  }
}
