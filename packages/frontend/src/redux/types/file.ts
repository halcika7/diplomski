export enum FileActions {
  SET_FILES = 'SET_FILES',
}

export interface FileType {
  _id: string;
  name: string;
  path: string;
  createdAt: string;
  updatedAt: string;
  orderedBy: { name: string, _id: string };
}

interface SetFiles {
  type: typeof FileActions.SET_FILES;
  payload: any[];
}

export type FileActionTypes = SetFiles;
