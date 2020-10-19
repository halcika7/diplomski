import { HTTPCodes, HTTPDescription } from '../codes';
import { HttpException } from './http.exception';

export class ServiceUnavailableException extends HttpException {
  /**
   * Instantiate a `ServiceUnavailableException` Exception.
   *
   * @example
   * `throw new ServiceUnavailableException()`
   *
   * The HTTP response status code will be 503.
   *
   * @param objectOrError string or object describing the error condition.
   * @param description a short description of the HTTP error.
   */
  constructor(objectOrError?: string | object | any) {
    super(
      HttpException.createBody(
        objectOrError,
        HTTPDescription.SERVICE_UNAVAILABLE,
        HTTPCodes.SERVICE_UNAVAILABLE
      ),
      HTTPCodes.SERVICE_UNAVAILABLE,
      HTTPDescription.SERVICE_UNAVAILABLE
    );
  }
}
