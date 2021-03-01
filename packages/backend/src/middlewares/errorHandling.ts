import { Request, Response, NextFunction } from 'express';
import { LoggerFactory } from '@logger';
import { HTTPCodes, HttpException } from '@job/common';

export const errorHandle = (
  error: Error | HttpException,
  _: Request,
  res: Response,
  __: NextFunction
) => {
  if (error instanceof HttpException) {
    const logger = LoggerFactory.getLogger('HttpException');

    logger.error((error as unknown) as Error, 'HttpException error');
    return res.status(error.getStatus()).json(error.getResponse());
  }

  const logger = LoggerFactory.getLogger('Unhandled error');

  logger.error(error, 'Unhandled error');

  return res
    .status(HTTPCodes.INTERNAL_SERVER_ERROR)
    .json({ message: 'Internal server error' });
};
