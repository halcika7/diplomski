import { FileTypeFront as FileType } from '@job/common';

export enum FileActions {
  SET_FILES = 'SET_FILES',
  SET_FILE_ERROR_MESSAGE = 'SET_FILE_ERROR_MESSAGE',
}

interface SetFiles {
  type: typeof FileActions.SET_FILES;
  payload: FileType[];
}

interface SetFileErrorMessage {
  type: typeof FileActions.SET_FILE_ERROR_MESSAGE;
  payload: string;
}

export type FileActionTypes = SetFiles | SetFileErrorMessage;
