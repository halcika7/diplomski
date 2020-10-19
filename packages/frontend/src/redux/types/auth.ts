export enum AuthActions {
  AUTH_SUCCESS = 'AUTH_SUCCESS',
  AUTH_RESET = 'AUTH_RESET',
  AUTH_SET_LOADING = 'AUTH_SET_LOADING',
}

interface AuthSuccess {
  type: typeof AuthActions.AUTH_SUCCESS;
  payload: { role: string; id: string; token: string };
}

interface AuthReset {
  type: typeof AuthActions.AUTH_RESET;
  payload: {};
}

interface AuthSetLoading {
  type: typeof AuthActions.AUTH_SET_LOADING;
  payload: { loading: boolean };
}

export type AuthActionTypes = AuthSuccess | AuthReset | AuthSetLoading;
