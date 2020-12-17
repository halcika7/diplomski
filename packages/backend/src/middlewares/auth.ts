import { HTTPCodes, Token } from '@job/common';
import { JWTService } from '@service/JWT';
import { NextFunction, Request, Response } from 'express';

const returnUnAuthorizedRequest = (res: Response) =>
  res.status(HTTPCodes.UNAUTHORIZED).json({ message: 'Unauthorized request.' });

export const authMiddleware = (permission: string[] | null = null) => (
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
    const decoded = JWTService.verifyToken(token) as Token;
    if (permission && !permission.includes(decoded.role)) {
      return returnUnAuthorizedRequest(res);
    }
    req.user = { ...decoded };
    return next();
  } catch {
    return returnUnAuthorizedRequest(res);
  }
};
