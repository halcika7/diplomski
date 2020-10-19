import { HTTPCodes, HTTPDescription } from '../codes';
import { HttpException } from './http.exception';

export class ImATeapotException extends HttpException {
  /**
   * Instantiate an `ImATeapotException` Exception.
   *
   * @example
   * `throw new BadGatewayException()`
   *
   * The HTTP response status code will be 418.
   *
   * @param objectOrError string or object describing the error condition.
   * @param description a short description of the HTTP error.
   */
  constructor(objectOrError?: string | object | any) {
    super(
      HttpException.createBody(
        objectOrError,
        HTTPDescription.IM_A_TEAPOT,
        HTTPCodes.IM_A_TEAPOT
      ),
      HTTPCodes.IM_A_TEAPOT,
      HTTPDescription.IM_A_TEAPOT
    );
  }
}
