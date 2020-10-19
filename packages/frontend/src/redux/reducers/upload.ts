import { UploadActionTypes, UploadActions } from '../types/upload';

export interface UploadState {
  papers: string[];
  bindings: string[];
}

export const INITIAL_STATE: UploadState = {
  papers: [],
  bindings: [],
};

export function UploadReducer(
  prevState = INITIAL_STATE,
  action: UploadActionTypes
) {
  switch (action.type) {
    case UploadActions.SET_BINDINGS_PAPERS:
      return { ...INITIAL_STATE, ...action.payload };
    default:
      return prevState;
  }
}
