import { FileTypeFront as FileType } from '@job/common';

export enum FileActions {
  SET_FILES = 'SET_FILES',
}

interface SetFiles {
  type: typeof FileActions.SET_FILES;
  payload: FileType[];
}

export type FileActionTypes = SetFiles;
