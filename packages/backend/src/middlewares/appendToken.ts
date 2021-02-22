import { Token } from '@job/common';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

export const appendToken = () => async (
  req: Request,
  _: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization
    ? req.headers.authorization.split(' ')[1]
    : '';

  const dec = jwt.decode(token) as Token;
  req.user = { ...dec };

  return next();
};
