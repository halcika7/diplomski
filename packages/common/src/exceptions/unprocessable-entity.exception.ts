import { HTTPCodes, HTTPDescription } from '../codes';
import { HttpException } from './http.exception';

export class UnprocessableEntityException extends HttpException {
  /**
   * Instantiate an `UnprocessableEntityException` Exception.
   *
   * @example
   * `throw new UnprocessableEntityException()`
   *
   * The HTTP response status code will be 422.
   *
   * @param objectOrError string or object describing the error condition.
   * @param description a short description of the HTTP error.
   */
  constructor(objectOrError?: string | object | any) {
    super(
      HttpException.createBody(
        objectOrError,
        HTTPDescription.UNPROCESSABLE_ENTITY,
        HTTPCodes.UNPROCESSABLE_ENTITY
      ),
      HTTPCodes.UNPROCESSABLE_ENTITY,
      HTTPDescription.UNPROCESSABLE_ENTITY
    );
  }
}
