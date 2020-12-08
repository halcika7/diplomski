import { AddUserErrors, ProfileErrors } from '@reducers/user';

export enum UserActions {
  SET_USER_DATA = 'SET_USER_DATA',
  UPDATE_USER_DATA = 'UPDATE_USER_DATA',
  SET_USER_TO_EDIT = 'SET_USER_TO_EDIT',
  SET_UPLOAD_ERROR = 'SET_UPLOAD_ERROR',
  SET_PROFILE_ERRORS = 'SET_PROFILE_ERRORS',
  SET_USER_PHOTO = 'SET_USER_PHOTO',
  SET_USER_RESPONSE = 'SET_USER_RESPONSE',
  SET_USERS = 'SET_USERS',
  SET_USER_ROLE = 'SET_USER_ROLE',
  SET_USER_BLOCKED_STATUS = 'SET_USER_BLOCKED_STATUS',
  SET_ADD_USER_ERRORS = 'SET_ADD_USER_ERRORS',
}

export interface UserData {
  name: string;
  picture: string;
  email: string;
  facebookLink: string;
  twitterLink: string;
  phone: string;
}

export type UserType =
  | 'admin'
  | 'administration'
  | 'all'
  | 'worker'
  | 'professor';

export interface User extends UserData {
  _id: string;
  role: string;
  blocked: boolean;
}

export interface UserToEdit extends User {
  googleID: string;
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

interface SetUsers {
  type: typeof UserActions.SET_USERS;
  payload: User[] | null;
}

interface SetUserToEdit {
  type: typeof UserActions.SET_USER_TO_EDIT;
  payload: UserToEdit | null;
}

interface SetUserResponse {
  type: typeof UserActions.SET_USER_RESPONSE;
  payload: { message: string; status: number | null };
}

interface SetProfileErrors {
  type: typeof UserActions.SET_PROFILE_ERRORS;
  payload: Partial<ProfileErrors>;
}

interface UpdateUserData {
  type: typeof UserActions.UPDATE_USER_DATA;
  payload: Partial<ProfileErrors>;
}

interface SetUserRole {
  type: typeof UserActions.SET_USER_ROLE;
  payload: string;
}

interface SetUserBlockedStatus {
  type: typeof UserActions.SET_USER_BLOCKED_STATUS;
  payload: { blocked: boolean; id: string };
}

interface SetAddUserErrors {
  type: typeof UserActions.SET_ADD_USER_ERRORS;
  payload: AddUserErrors;
}

export type UserActionTypes =
  | SetUserData
  | SetUserToEdit
  | SetUploadError
  | SetUserPhoto
  | SetUserResponse
  | SetProfileErrors
  | UpdateUserData
  | SetUserRole
  | SetUserBlockedStatus
  | SetAddUserErrors
  | SetUsers;
