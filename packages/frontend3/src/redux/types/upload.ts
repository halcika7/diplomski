import { UploadFileErrors } from '@reducers/upload';

export enum UploadActions {
  UPLOAD_FILE = 'UPLOAD_FILE',
  SET_BINDINGS_PAPERS = 'SET_BINDINGS_PAPERS',
  SET_UPLOAD_ERRORS = 'SET_UPLOAD_ERRORS',
  SET_UPLOAD_STATUS = 'SET_UPLOAD_STATUS',
}

interface UploadFile {
  type: typeof UploadActions.UPLOAD_FILE;
  payload: { data: FormData };
}

interface SetBindingsPapers {
  type: typeof UploadActions.SET_BINDINGS_PAPERS;
  payload: { bindings: string[]; papers: string[] };
}

interface SetUploadErrors {
  type: typeof UploadActions.SET_UPLOAD_ERRORS;
  payload: Partial<UploadFileErrors>;
}

interface SetUploadStatus {
  type: typeof UploadActions.SET_UPLOAD_STATUS;
  payload: { message: string; status: number | null };
}

export type UploadActionTypes =
  | UploadFile
  | SetBindingsPapers
  | SetUploadStatus
  | SetUploadErrors;
