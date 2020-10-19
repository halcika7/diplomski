import { HTTPCodes, HTTPDescription } from '../codes';
import { HttpException } from './http.exception';

export class BadRequestException extends HttpException {
  /**
   * Instantiate a `BadRequestException` Exception.
   *
   * @example
   * `throw new BadRequestException()`
   *
   * The HTTP response status code will be 400.
   *
   * @param objectOrError string or object describing the error condition.
   * @param description a short description of the HTTP error.
   */
  constructor(objectOrError?: string | object | any) {
    super(
      HttpException.createBody(
        objectOrError,
        HTTPDescription.BAD_REQUEST,
        HTTPCodes.BAD_REQUEST
      ),
      HTTPCodes.BAD_REQUEST,
      HTTPDescription.BAD_REQUEST
    );
  }
}
