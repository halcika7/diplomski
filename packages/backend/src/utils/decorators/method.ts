import {
  httpGet,
  httpPatch,
  httpPost,
  httpDelete,
  httpHead,
  httpMethod,
  httpPut,
} from 'inversify-express-utils';

export const Get = httpGet;
export const Patch = httpPatch;
export const Post = httpPost;
export const Delete = httpDelete;
export const Put = httpPut;
export const Head = httpHead;
export const Method = httpMethod;
