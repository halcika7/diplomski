import { axios } from '@axios';
import { AppThunkDispatch } from '../AppThunkDispatch';
import { FileActionTypes, FileActions } from '../types/file';
import { FileTypeFront as FileType } from '@job/common';

const setFiles = (files: FileType[]): FileActionTypes => ({
  type: FileActions.SET_FILES,
  payload: files,
});

export const getFiles = async (dispatch: AppThunkDispatch) => {
  const { data } = await axios.get<{
    files: FileType[];
  }>('/file/');
  dispatch(setFiles(data.files));
};
