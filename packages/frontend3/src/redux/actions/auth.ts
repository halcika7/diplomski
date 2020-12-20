import { axios } from '@axios';
import { AuthToken } from '@decode';

// types
import { AppThunkDispatch } from '../AppThunkDispatch';
import { AuthActions, AuthActionTypes } from '../types/auth';
import { getUserData } from './user';

export const authSuccess = (token: string): AuthActionTypes => ({
  type: AuthActions.AUTH_SUCCESS,
  payload: { ...AuthToken.getTokenData(token), token },
});

export const authReset = (): AuthActionTypes => ({
  type: AuthActions.AUTH_RESET,
  payload: {},
});

export const logoutUser = async (
  dispatch: AppThunkDispatch
): Promise<AuthActionTypes> => {
  await axios.post<{ message?: string }>('/auth/logout');

  return dispatch(authReset());
};

export const refreshToken = async (dispatch: AppThunkDispatch) => {
  dispatch({ type: AuthActions.AUTH_SET_LOADING, payload: { loading: true } });
  const { data } = await axios.get<{
    message: string;
    accessToken: string;
  }>('/auth/refresh');

  if (data.accessToken) {
    dispatch(getUserData);
    return dispatch(authSuccess(data.accessToken));
  }

  return dispatch(authReset());
};