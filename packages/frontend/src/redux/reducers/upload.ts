import { UploadActionTypes, UploadActions } from '../types/upload';

export interface UploadFileErrors {
  numberOfCopies: string;
  printOption: string;
  paperOption: string;
  bindingOption: string;
  file: string;
}

export interface UploadState {
  papers: string[];
  bindings: string[];
  errors: UploadFileErrors;
  message: string;
  status: number | null;
}

export const InitialUploadErrors = {
  numberOfCopies: '',
  printOption: '',
  paperOption: '',
  bindingOption: '',
  file: '',
};

export const INITIAL_STATE: UploadState = {
  papers: [],
  bindings: [],
  errors: InitialUploadErrors,
  message: '',
  status: null,
};

export function UploadReducer(
  prevState = INITIAL_STATE,
  action: UploadActionTypes
) {
  switch (action.type) {
    case UploadActions.SET_BINDINGS_PAPERS:
      return { ...INITIAL_STATE, ...action.payload };
    case UploadActions.SET_UPLOAD_ERRORS:
      return {
        ...prevState,
        errors: { ...prevState.errors, ...action.payload },
      };
    case UploadActions.SET_UPLOAD_STATUS:
      return { ...prevState, ...action.payload };
    default:
      return prevState;
  }
}
