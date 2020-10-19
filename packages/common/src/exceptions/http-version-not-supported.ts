import { HTTPCodes, HTTPDescription } from '../codes';
import { HttpException } from './http.exception';

export class HttpVersionNotSupportedException extends HttpException {
  /**
   * Instantiate a `HttpVersionNotSupportedException` Exception.
   *
   * @example
   * `throw new HttpVersionNotSupportedException()`
   *
   * The HTTP response status code will be 505.
   *
   * @param objectOrError string or object describing the error condition.
   * @param description a short description of the HTTP error.
   */
  constructor(objectOrError?: string | object | any) {
    super(
      HttpException.createBody(
        objectOrError,
        HTTPDescription.HTTP_VERSION_NOT_SUPPORTED,
        HTTPCodes.HTTP_VERSION_NOT_SUPPORTED
      ),
      HTTPCodes.HTTP_VERSION_NOT_SUPPORTED,
      HTTPDescription.HTTP_VERSION_NOT_SUPPORTED
    );
  }
}
