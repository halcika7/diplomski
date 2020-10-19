import { HTTPCodes, HTTPDescription } from '../codes';
import { HttpException } from './http.exception';

export class NotAcceptableException extends HttpException {
  /**
   * Instantiate a `NotAcceptableException` Exception.
   *
   * @example
   * `throw new NotAcceptableException()`
   *
   * The HTTP response status code will be 406.
   *
   * @param objectOrError string or object describing the error condition.
   * @param description a short description of the HTTP error.
   */
  constructor(objectOrError?: string | object | any) {
    super(
      HttpException.createBody(
        objectOrError,
        HTTPDescription.NOT_ACCEPTABLE,
        HTTPCodes.NOT_ACCEPTABLE
      ),
      HTTPCodes.NOT_ACCEPTABLE,
      HTTPDescription.NOT_ACCEPTABLE
    );
  }
}
