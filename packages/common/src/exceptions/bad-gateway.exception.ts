import { HTTPCodes, HTTPDescription } from '../codes';
import { HttpException } from './http.exception';

export class BadGatewayException extends HttpException {
  /**
   * Instantiate a `BadGatewayException` Exception.
   *
   * @example
   * `throw new BadGatewayException()`
   *
   * @usageNotes
   * The HTTP response status code will be 502.
   *
   * @param objectOrError string or object describing the error condition.
   * @param description a short description of the HTTP error.
   */
  constructor(objectOrError?: string | object | any) {
    super(
      HttpException.createBody(
        objectOrError,
        HTTPDescription.BAD_GATEWAY,
        HTTPCodes.BAD_GATEWAY
      ),
      HTTPCodes.BAD_GATEWAY,
      HTTPDescription.BAD_GATEWAY
    );
  }
}
