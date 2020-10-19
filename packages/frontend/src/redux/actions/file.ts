import { axios } from '@axios';
import { AppThunkDispatch } from '../AppThunkDispatch';
import { FileActionTypes, FileActions } from '../types/file';

const setFiles = (files: any[]): FileActionTypes => ({
  type: FileActions.SET_FILES,
  payload: files,
});

export const getFiles = async (dispatch: AppThunkDispatch) => {
  const { data } = await axios.get<{
    files: any[];
  }>('/file/');
  dispatch(setFiles(data.files));
};
