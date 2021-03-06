import { FileActionTypes, FileActions } from '../types/file';
import { FileTypeFront as FileType } from '@job/common';

export interface FileState {
  files: FileType[] | null;
}

export const INITIAL_STATE: FileState = {
  files: null,
};

export function FileReducer(
  prevState = INITIAL_STATE,
  action: FileActionTypes
) {
  switch (action.type) {
    case FileActions.SET_FILES:
      return { ...INITIAL_STATE, files: action.payload };
    default:
      return prevState;
  }
}
