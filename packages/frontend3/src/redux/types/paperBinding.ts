import {
  PaperFront as Paper,
  BindingFront as Binding,
  PaperErrors,
  BindingErrors,
  PaperBinding,
} from '@job/common';

export enum PaperBindingActions {
  SET_PAPER_BINDINGS = 'SET_PAPER_BINDINGS',
  SET_PAPERS = 'SET_PAPERS',
  SET_BINDINGS = 'SET_BINDINGS',
  SET_PAPER_BINDING_RESPONSE = 'SET_PAPER_BINDING_RESPONSE',
  UPDATE_BINDING_PAPER = 'UPDATE_BINDING_PAPER',
  SET_BINDING_ERRORS = 'SET_BINDING_ERRORS',
  SET_PAPER_ERRORS = 'SET_PAPER_ERRORS',
}

interface SetPaperBinding {
  type: typeof PaperBindingActions.SET_PAPER_BINDINGS;
  payload: { papers: Paper[]; bindings: Binding[] };
}

interface SetPapers {
  type: typeof PaperBindingActions.SET_PAPERS;
  payload: Paper[];
}

interface SetBindings {
  type: typeof PaperBindingActions.SET_BINDINGS;
  payload: Binding[];
}

interface SetPaperBindingResponse {
  type: typeof PaperBindingActions.SET_PAPER_BINDING_RESPONSE;
  payload: { message: string; status: number | null };
}

interface UpdateBindingPaper {
  type: typeof PaperBindingActions.UPDATE_BINDING_PAPER;
  payload: { id: string; available: boolean; type: PaperBinding };
}

interface SetBindingErrors {
  type: typeof PaperBindingActions.SET_BINDING_ERRORS;
  payload: Partial<BindingErrors>;
}

interface SetPaperErrors {
  type: typeof PaperBindingActions.SET_PAPER_ERRORS;
  payload: Partial<PaperErrors>;
}

export type PaperBindingActionTypes =
  | SetPaperBinding
  | SetPapers
  | SetBindings
  | UpdateBindingPaper
  | SetBindingErrors
  | SetPaperErrors
  | SetPaperBindingResponse;
