import { HTTPCodes, HTTPDescription } from '../codes';
import { HttpException } from './http.exception';

export class GatewayTimeoutException extends HttpException {
  /**
   * Instantiate a `GatewayTimeoutException` Exception.
   *
   * @example
   * `throw new GatewayTimeoutException()`
   *
   * The HTTP response status code will be 504.
   *
   * @param objectOrError string or object describing the error condition.
   * @param description a short description of the HTTP error.
   */
  constructor(objectOrError?: string | object | any) {
    super(
      HttpException.createBody(
        objectOrError,
        HTTPDescription.GATEWAY_TIMEOUT,
        HTTPCodes.GATEWAY_TIMEOUT
      ),
      HTTPCodes.GATEWAY_TIMEOUT,
      HTTPDescription.GATEWAY_TIMEOUT
    );
  }
}
