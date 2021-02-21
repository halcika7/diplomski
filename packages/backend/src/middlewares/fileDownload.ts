import { RequestUser } from '@ctypes';
import FileModel from '@model/File';
import { NextFunction, Response } from 'express';

const returnUnAuthorizedRequest = (res: Response) =>
  res.status(400).send('You are not allowed to download this file.');

export const fileMiddleware = () => async (
  req: RequestUser,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id, role } = req.user;
    const { path } = req.query;

    const file = await FileModel.findOne({ path: path as string });

    if (role === 'professor' && file?.orderedBy.toString() !== id) {
      return returnUnAuthorizedRequest(res);
    }

    if (role === 'administration' && file?.orderedFor !== 'University') {
      return returnUnAuthorizedRequest(res);
    }
  } catch {
    return returnUnAuthorizedRequest(res);
  }

  return next();
};
