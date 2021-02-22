import { HTTPCodes, Token } from '@job/common';
import { JWTService } from '@service/JWT';
import { RedisService } from '@service/Redis';
import { NextFunction, Request, Response } from 'express';

const returnUnAuthorizedRequest = (res: Response) =>
  res.status(HTTPCodes.UNAUTHORIZED).json({ message: 'Unauthorized request.' });

export const authMiddleware = (permission: string[] | null = null) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : '';

  if (!token) {
    return returnUnAuthorizedRequest(res);
  }

  try {
    const dec = JWTService.verifyToken(token) as Token;
    const refresh = await RedisService.getAsync(dec.id);
    JWTService.verifyToken(refresh, true);

    if (permission && !permission.includes(dec.role)) {
      return returnUnAuthorizedRequest(res);
    }
    req.user = { ...dec };
  } catch (err) {
    return returnUnAuthorizedRequest(res);
  }

  return next();
};
