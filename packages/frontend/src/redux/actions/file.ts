import { axios } from '@axios';
import { AppThunkDispatch } from '../AppThunkDispatch';
import { FileActionTypes, FileActions, FileType } from '../types/file';

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
