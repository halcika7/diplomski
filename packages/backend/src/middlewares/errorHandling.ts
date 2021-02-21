import { Request, Response, NextFunction } from 'express';
import { Logger, LoggerFactory } from '@logger';
import { HTTPCodes, HttpException } from '@job/common';

export const errorHandle = (
  error: Error | HttpException,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  console.log("🚀 ~ file: errorHandling.ts ~ line 12 ~ error", error)
  if (error instanceof HttpException) {
    return res.status(error.getStatus()).json(error.getResponse());
  }

  const logger = LoggerFactory.getLogger('Unhandled error') as Logger;

  logger.error(error, 'Unhandled error');

  return res
    .status(HTTPCodes.INTERNAL_SERVER_ERROR)
    .json({ message: 'Internal server error' });
};
