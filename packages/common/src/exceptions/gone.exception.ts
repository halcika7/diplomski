import { HTTPCodes, HTTPDescription } from '../codes';
import { HttpException } from './http.exception';

export class GoneException extends HttpException {
  /**
   * Instantiate a `GoneException` Exception.
   *
   * @example
   * `throw new GoneException()`
   *
   * The HTTP response status code will be 410.
   *
   * @param objectOrError string or object describing the error condition.
   * @param description a short description of the HTTP error.
   */
  constructor(objectOrError?: string | object | any) {
    super(
      HttpException.createBody(
        objectOrError,
        HTTPDescription.GONE,
        HTTPCodes.GONE
      ),
      HTTPCodes.GONE,
      HTTPDescription.GONE
    );
  }
}
