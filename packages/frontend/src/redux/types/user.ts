export enum UserActions {
  SET_USER_DATA = 'SET_USER_DATA',
  SET_UPLOAD_ERROR = 'SET_UPLOAD_ERROR',
  SET_USER_PHOTO = 'SET_USER_PHOTO',
  RESET_USER_RESPONSE = 'RESET_USER_RESPONSE',
  SET_USERS = 'SET_USERS',
}

export interface UserData {
  name: string;
  picture: string;
  email: string;
  facebookLink: string;
  twitterLink: string;
  phone: string;
}

export interface User extends UserData {
  _id?: string;
  id?: string;
  role: string;
  blocked: boolean;
}

interface SetUserData {
  type: typeof UserActions.SET_USER_DATA;
  payload: { data: UserData };
}

interface SetUploadError {
  type: typeof UserActions.SET_UPLOAD_ERROR;
  payload: { message: string; status: number };
}

interface SetUserPhoto {
  type: typeof UserActions.SET_USER_PHOTO;
  payload: { url: string; message: string; status: number };
}

interface ResetUserResponse {
  type: typeof UserActions.RESET_USER_RESPONSE;
  payload: {};
}

interface SetUsers {
  type: typeof UserActions.SET_USERS
  payload: User[] | undefined;
}

export type UserActionTypes =
  | SetUserData
  | SetUploadError
  | SetUserPhoto
  | ResetUserResponse
  | SetUsers;
