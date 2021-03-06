import { AnyDictionary } from '@job/common';

export enum AuthActions {
  AUTH_SUCCESS = 'AUTH_SUCCESS',
  AUTH_RESET = 'AUTH_RESET',
  AUTH_SET_LOADING = 'AUTH_SET_LOADING',
}

interface AuthSuccess {
  type: typeof AuthActions.AUTH_SUCCESS;
  payload: {
    role: string | null;
    id: string | null;
    token: string;
    year: number | null;
  };
}

interface AuthReset {
  type: typeof AuthActions.AUTH_RESET;
  payload: AnyDictionary;
}

interface AuthSetLoading {
  type: typeof AuthActions.AUTH_SET_LOADING;
  payload: { loading: boolean };
}

export type AuthActionTypes = AuthSuccess | AuthReset | AuthSetLoading;
