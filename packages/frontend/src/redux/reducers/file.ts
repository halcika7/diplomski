import { FileActionTypes, FileActions } from '../types/file';
import { FileTypeFront as FileType } from '@job/common';

export interface FileState {
  files: FileType[] | null;
  message: string;
}

export const INITIAL_STATE: FileState = {
  files: null,
  message: '',
};

export function FileReducer(
  prevState = INITIAL_STATE,
  action: FileActionTypes
) {
  switch (action.type) {
    case FileActions.SET_FILES:
      return { ...INITIAL_STATE, files: action.payload };
    case FileActions.SET_FILE_ERROR_MESSAGE:
      return { ...prevState, message: action.payload };
    default:
      return prevState;
  }
}
