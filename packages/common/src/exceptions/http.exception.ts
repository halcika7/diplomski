import { isObject, isString } from '../validation';

export class HttpException extends Error {
  /**
   * Instantiate a plain HTTP Exception.
   *
   * @example
   * `throw new HttpException()`
   *
   * @param response string or object describing the error condition.
   * @param status HTTP response status code.
   */
  constructor(
    private readonly response: string | Record<string, any>,
    private readonly status: number,
    readonly name: string = 'Error'
  ) {
    super();
    this.initMessage();
  }

  private initMessage = () => {
    if (isString(this.response)) {
      this.message = this.response;
    } else if (
      isObject(this.response) &&
      isString((this.response as Record<string, any>).message)
    ) {
      this.message = (this.response as Record<string, any>).message;
    } else if (this.constructor) {
      const match = this.constructor.name.match(/[A-Z][a-z]+|[0-9]+/g);
      this.message = match ? match.join(' ') : '';
    }
  };

  public getResponse(): string | Record<string, unknown> {
    return this.response;
  }

  public getStatus(): number {
    return this.status;
  }

  public static createBody(
    objectOrError: Record<string, unknown> | string,
    message?: string,
    statusCode?: number
  ) {
    if (!objectOrError) {
      return { statusCode, message };
    }
    return isObject(objectOrError) && !Array.isArray(objectOrError)
      ? objectOrError
      : { statusCode, message: objectOrError, error: message };
  }
}
