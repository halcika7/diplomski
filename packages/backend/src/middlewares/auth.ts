import { HTTPCodes, Token } from '@job/common';
import { JWTService } from '@service/JWT';
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

  if (!token) return returnUnAuthorizedRequest(res);

  try {
    const decoded = JWTService.verifyToken(token) as Token;

    if (permission && !permission.includes(decoded.role)) {
      return res
        .status(HTTPCodes.FORBIDDEN)
        .json({ message: "You don't have permission to make request." });
    }
    req.user = { ...decoded };
  } catch (err) {
    return returnUnAuthorizedRequest(res);
  }

  return next();
};
