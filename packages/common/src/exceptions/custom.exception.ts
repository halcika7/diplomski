import { HttpException } from './http.exception';

export class CustomException extends HttpException {
  /**
   * Instantiate a `CustomException` Exception.
   *
   * @example
   * `throw new CustomException()`
   *
   * @usageNotes
   * The HTTP response status code will be any choosen code.
   *
   * @param objectOrError string or object describing the error condition.
   * @param description a short description of the HTTP error.
   */
  constructor(
    objectOrError: string | object | any,
    description: string,
    statusCode: number
  ) {
    super(
      HttpException.createBody(objectOrError, description, statusCode),
      statusCode
    );
  }
}
