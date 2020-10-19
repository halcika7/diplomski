import { HTTPCodes, HTTPDescription } from '../codes';
import { HttpException } from './http.exception';

export class InternalServerErrorException extends HttpException {
  /**
   * Instantiate an `InternalServerErrorException` Exception.
   *
   * @example
   * `throw new InternalServerErrorException()`
   *
   * The HTTP response status code will be 500.
   *
   * @param objectOrError string or object describing the error condition.
   * @param description a short description of the HTTP error.
   */
  constructor(objectOrError?: string | object | any) {
    super(
      HttpException.createBody(
        objectOrError,
        HTTPDescription.INTERNAL_SERVER_ERROR,
        HTTPCodes.INTERNAL_SERVER_ERROR
      ),
      HTTPCodes.INTERNAL_SERVER_ERROR,
      HTTPDescription.INTERNAL_SERVER_ERROR
    );
  }
}
