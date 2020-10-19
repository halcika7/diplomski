import { Response } from 'express';
import { Injectable } from '@decorator/class';

@Injectable()
export class BaseController {
  protected sendResponse(
    res: Response,
    status: number,
    resObj: object
  ): Response {
    return res.status(status).json({ ...resObj });
  }
}
