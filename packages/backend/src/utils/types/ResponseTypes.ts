export interface ResponseMessage {
  status: number;
  message: string;
}

export interface ResponseObject {
  status: number;
  [key: string]: any;
}

export interface ValidationResponse {
  status: number;
  message?: string;
  errors?: { [key: string]: any };
}

export interface ResponseTokens extends ResponseMessage {
  accessToken?: string;
  refreshToken?: string;
}

export interface RedirectResponse {
  message?: string;
  accessToken?: string;
  err?: string;
}
