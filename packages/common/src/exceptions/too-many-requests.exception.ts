import { HTTPCodes, HTTPDescription } from '../codes';
import { HttpException } from './http.exception';

export class TooManyRequestsException extends HttpException {
  /**
   * Instantiate a `TooManyRequestsException` Exception.
   *
   * @example
   * `throw new TooManyRequestsException()`
   *
   * @usageNotes
   * The HTTP response status code will be 429.
   *
   * @param objectOrError string or object describing the error condition.
   * @param description a short description of the HTTP error.
   */
  constructor(objectOrError?: string | object | any) {
    super(
      HttpException.createBody(
        objectOrError,
        HTTPDescription.TOO_MANY_REQUESTS,
        HTTPCodes.TOO_MANY_REQUESTS
      ),
      HTTPCodes.TOO_MANY_REQUESTS,
      HTTPDescription.TOO_MANY_REQUESTS
    );
  }
}
