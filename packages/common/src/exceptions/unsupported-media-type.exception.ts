import { HTTPCodes, HTTPDescription } from '../codes';
import { HttpException } from './http.exception';

export class UnsupportedMediaTypeException extends HttpException {
  /**
   * Instantiate an `UnsupportedMediaTypeException` Exception.
   *
   * @example
   * `throw new UnsupportedMediaTypeException()`
   *
   * The HTTP response status code will be 415.
   *
   * @param objectOrError string or object describing the error condition.
   * @param description a short description of the HTTP error.
   */
  constructor(objectOrError?: string | object | any) {
    super(
      HttpException.createBody(
        objectOrError,
        HTTPDescription.UNSUPPORTED_MEDIA_TYPE,
        HTTPCodes.UNSUPPORTED_MEDIA_TYPE
      ),
      HTTPCodes.UNSUPPORTED_MEDIA_TYPE,
      HTTPDescription.UNSUPPORTED_MEDIA_TYPE
    );
  }
}
