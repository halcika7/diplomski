import { FileActionTypes, FileActions } from '../types/file';

export interface FileState {
  files: any[];
}

export const INITIAL_STATE: FileState = {
  files: [],
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
