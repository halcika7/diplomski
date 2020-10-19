export enum FileActions {
  SET_FILES = 'SET_FILES',
}

interface SetFIles {
  type: typeof FileActions.SET_FILES;
  payload: any[];
}

export type FileActionTypes = SetFIles;
