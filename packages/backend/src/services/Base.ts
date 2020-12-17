import { Injectable } from '@decorator/class';
import { ResponseMessage, ResponseObject } from '@ctypes';
import { AnyDictionary } from '@job/common';

@Injectable()
export class BaseService {
  protected returnGenericFailed(status: number): ResponseMessage {
    return {
      status,
      message: 'We were unable to process request. Please try again later.',
    };
  }

  protected returnResponse(
    status: number,
    objectResp: AnyDictionary
  ): ResponseObject {
    return { status, ...objectResp };
  }

  protected returnResponseMessage(
    status: number,
    message: string
  ): ResponseMessage {
    return { status, message };
  }

  protected returnResponseTokens<T>(data: T) {
    return { ...data };
  }
}
