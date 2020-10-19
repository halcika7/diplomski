import { User } from './../types/user';
import { axios } from '@axios';
import { AppThunkDispatch } from '../AppThunkDispatch';
import { ProfileErrors } from '../reducers/user';
import { UserActions, UserActionTypes, UserData } from '../types/user';

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

export const restUserResponse = (): UserActionTypes => ({
  type: UserActions.RESET_USER_RESPONSE,
  payload: {},
});

export const updateInfo = (_: ProfileErrors) => async (
  _: AppThunkDispatch
) => {
  // const { data } = await axios.patch<{
  //   values?: ProfileErrors;
  //   errors?: ProfileErrors;
  // }>('/user/', profileData);
};

export const setUsers = (users: User[] | undefined): UserActionTypes => ({
  type: UserActions.SET_USERS,
  payload: users,
})

export const getUsers = (role: string) => async (
  dispatch: AppThunkDispatch
  ) => {
    console.log("role", role)
  const { data } = await axios.get<{
    users: User[];
  }>(`/user/${role}`);
  console.log("data", data)
  dispatch(setUsers(data.users));
}
