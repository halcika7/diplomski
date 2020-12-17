import { Response } from 'express';
import { Injectable } from '@decorator/class';
import { UnknownDictionary } from '@job/common';

@Injectable()
export class BaseController {
  protected sendResponse(
    res: Response,
    status: number,
    resObj: UnknownDictionary
  ): Response {
    return res.status(status).json({ ...resObj });
  }
}
