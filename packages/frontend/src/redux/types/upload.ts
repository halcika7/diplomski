export enum UploadActions {
  UPLOAD_FILE = 'UPLOAD_FILE',
  SET_BINDINGS_PAPERS = 'SET_BINDINGS_PAPERS',
}

interface UploadFile {
  type: typeof UploadActions.UPLOAD_FILE;
  payload: { data: FormData };
}

interface SetBindingsPapers {
  type: typeof UploadActions.SET_BINDINGS_PAPERS;
  payload: { bindings: string[]; papers: string[] };
}

export type UploadActionTypes = UploadFile | SetBindingsPapers;
