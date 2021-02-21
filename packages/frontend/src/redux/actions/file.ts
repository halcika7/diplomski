import { axios } from '@axios';
import { AppThunkDispatch } from '../AppThunkDispatch';
import { FileActionTypes, FileActions } from '../types/file';
import { FileTypeFront as FileType } from '@job/common';
import download from 'downloadjs';

export const setFiles = (files: FileType[]): FileActionTypes => ({
  type: FileActions.SET_FILES,
  payload: files,
});

export const getFiles = async (dispatch: AppThunkDispatch) => {
  const { data } = await axios.get<{
    files: FileType[];
  }>('/file/');
  dispatch(setFiles(data.files));
};

export const setFileErrorMessage = (message: string): FileActionTypes => ({
  type: FileActions.SET_FILE_ERROR_MESSAGE,
  payload: message,
});

export const downloadFile = (path: string) => async (
  dispatch: AppThunkDispatch
) => {
  const name = path.split('public/files/final/')[1];
  const { status, data } = await axios.get(`/file/file?path=${path}`, {
    responseType: 'blob',
    timeout: 30000,
  });

  if (status === 200) {
    return download(data, name);
  }

  if (status === 400) {
    return dispatch(
      setFileErrorMessage('You are not allowed to download this file.')
    );
  }

  return dispatch(setFileErrorMessage('File does not exist'));
};
