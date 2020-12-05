import {
  User,
  UserType,
  UserActions,
  UserActionTypes,
  UserData,
  UserToEdit,
} from './../types/user';
import { axios } from '@axios';
import { AppThunkDispatch } from '../AppThunkDispatch';
import { ProfileErrors } from '../reducers/user';

const setUserData = (userData: UserData): UserActionTypes => ({
  type: UserActions.SET_USER_DATA,
  payload: { data: userData },
});

const setUserPhoto = (
  url: string,
  message: string,
  status: number
): UserActionTypes => ({
  type: UserActions.SET_USER_PHOTO,
  payload: { url, message, status },
});

const setUploadError = (message: string, status: number): UserActionTypes => ({
  type: UserActions.SET_UPLOAD_ERROR,
  payload: { message, status },
});

export const getUserData = async (dispatch: AppThunkDispatch) => {
  const { data } = await axios.get<{
    userData: UserData;
  }>('/user/');
  dispatch(setUserData(data.userData));
};

export const updateProfilePicture = (formData: FormData) => async (
  dispatch: AppThunkDispatch
) => {
  const { data } = await axios.post<{
    url?: string;
    error?: string;
  }>('/user/picture', formData, {
    headers: { 'content-type': 'multipart/form-data' },
  });

  if (data.error) {
    dispatch(setUploadError(data.error, 400));
  }
  if (data.url) {
    dispatch(setUserPhoto(data.url, 'Profile image successfully updated', 200));
  }
};

const setUserResponse = (
  message: string,
  status: number | null
): UserActionTypes => ({
  type: UserActions.SET_USER_RESPONSE,
  payload: { message, status },
});

export const restUserResponse = () => (dispatch: AppThunkDispatch) =>
  dispatch(setUserResponse('', null));

export const updateInfo = (info: Partial<ProfileErrors>) => async (
  dispatch: AppThunkDispatch
) => {
  const { data, status } = await axios.patch<{
    errors?: Partial<ProfileErrors>;
    message?: string;
  }>('/user/', info);

  dispatch(setUserResponse(data.message || '', status));

  if (data.errors) {
    dispatch({
      type: UserActions.SET_PROFILE_ERRORS,
      payload: data.errors,
    });
  }

  if (status === 200) {
    dispatch({
      type: UserActions.UPDATE_USER_DATA,
      payload: info,
    });
  }
};

export const setUsers = (users: User[] | null): UserActionTypes => ({
  type: UserActions.SET_USERS,
  payload: users,
});

export const getUsers = (role: UserType) => async (
  dispatch: AppThunkDispatch
) => {
  const { data } = await axios.get<{
    users: User[];
  }>(`/user/${role}`);
  dispatch(setUsers(data.users));
};

export const setUserToEdit = (user: UserToEdit | null): UserActionTypes => ({
  type: UserActions.SET_USER_TO_EDIT,
  payload: user,
});

export const getUserToEdit = (id: string) => async (
  dispatch: AppThunkDispatch
) => {
  const { data, status } = await axios.get<{
    user: UserToEdit;
    message: string;
  }>(`/user/edit/${id}`);
  console.log('🚀 ~ file: user.ts ~ line 100 ~ data', data);

  if (status !== 200) {
    return dispatch(setUserResponse(data.message, status));
  }

  return dispatch(setUserToEdit(data.user));
};

export const changeUserRole = (role: string, id: string) => async (
  dispatch: AppThunkDispatch
) => {
  const { data, status } = await axios.patch<{
    message: string;
  }>(`/user/${role}/${id}`);

  dispatch(setUserResponse(data.message, status));

  if (status === 200) {
    dispatch({
      type: UserActions.SET_USER_ROLE,
      payload: role,
    });
  }
};

export const changeUserBlockStatus = (blocked: boolean, id: string) => async (
  dispatch: AppThunkDispatch
) => {
  const { data, status } = await axios.patch<{
    message: string;
  }>(`/user/status/${blocked}/${id}`);

  dispatch(setUserResponse(data.message, status));

  if (status === 200) {
    dispatch({
      type: UserActions.SET_USER_BLOCKED_STATUS,
      payload: { blocked, id },
    });
  }
};
