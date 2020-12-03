import { User } from './../types/user';
import { UserActions, UserActionTypes } from '../types/user';
import { UserData } from '../types/user';

export interface ProfileErrors {
  twitter: string;
  facebook: string;
  phone: string;
}

export interface UserState {
  users: User[] | null;
  userData: Record<string, string> | UserData;
  message: string;
  status: number | null;
  profileErrors: ProfileErrors;
  loading: boolean;
}

export const INITIAL_STATE: UserState = {
  users: null,
  userData: {},
  message: '',
  status: null,
  profileErrors: { twitter: '', facebook: '', phone: '' },
  loading: true,
};

export function UserReducer(
  prevState = INITIAL_STATE,
  action: UserActionTypes
) {
  switch (action.type) {
    case UserActions.SET_USER_DATA:
      return { ...INITIAL_STATE, userData: { ...action.payload.data } };
    case UserActions.SET_USER_PHOTO:
      return {
        ...prevState,
        userData: { ...prevState.userData, picture: action.payload.url },
        message: action.payload.message,
        status: action.payload.status,
      };
    case UserActions.SET_UPLOAD_ERROR:
      return {
        ...prevState,
        status: action.payload.status,
        message: action.payload.message,
      };
    case UserActions.RESET_USER_RESPONSE:
      return { ...prevState, status: null, message: '' };
    case UserActions.SET_USERS:
      return { ...prevState, users: action.payload, loading: !action.payload };
    default:
      return prevState;
  }
}
