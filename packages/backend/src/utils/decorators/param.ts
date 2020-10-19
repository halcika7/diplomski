import {
  queryParam,
  requestParam,
  requestHeaders,
  request,
  response,
  next,
  cookies,
  requestBody,
} from 'inversify-express-utils';

export const Req = request;

export const Res = response;

export const Next = next;

export const Cookie = cookies;

export const Headers = requestHeaders;

export const Query = queryParam;

export const Body = requestBody;

export const Param = requestParam;
