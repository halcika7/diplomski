import { HTTPCodes, HTTPDescription } from '../codes';
import { HttpException } from './http.exception';

export class RequestTimeoutException extends HttpException {
  /**
   * Instantiate a `RequestTimeoutException` Exception.
   *
   * @example
   * `throw new RequestTimeoutException()`
   *
   * The HTTP response status code will be 408.
   *
   * @param objectOrError string or object describing the error condition.
   * @param description a short description of the HTTP error.
   */
  constructor(objectOrError?: string | object | any) {
    super(
      HttpException.createBody(
        objectOrError,
        HTTPDescription.REQUEST_TIMEOUT,
        HTTPCodes.REQUEST_TIMEOUT
      ),
      HTTPCodes.REQUEST_TIMEOUT,
      HTTPDescription.REQUEST_TIMEOUT
    );
  }
}
