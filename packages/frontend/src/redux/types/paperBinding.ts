import { BindingErrors, PaperErrors } from '../reducers/paperBinding';

export enum PaperBindingActions {
  SET_PAPER_BINDINGS = 'SET_PAPER_BINDINGS',
  SET_PAPERS = 'SET_PAPERS',
  SET_BINDINGS = 'SET_BINDINGS',
  SET_PAPER_BINDING_RESPONSE = 'SET_PAPER_BINDING_RESPONSE',
  UPDATE_BINDING_PAPER = 'UPDATE_BINDING_PAPER',
  SET_BINDING_ERRORS = 'SET_BINDING_ERRORS',
  SET_PAPER_ERRORS = 'SET_PAPER_ERRORS',
}

export interface Paper {
  _id: string;
  name: string;
  blackWhitePrinting: {
    upTo250: number;
    from250upTo500: number;
    from500upTo1000: number;
    from1000: number;
  };
  colorPrinting: {
    upTo250: number;
    from250upTo500: number;
    from500upTo1000: number;
    from1000: number;
  };
  available: boolean;
}

export interface Binding {
  _id: string;
  name: string;
  upTo25: number;
  from25upTo50: number;
  from50upTo100: number;
  from100upTo150: number;
  available: boolean;
}

export interface AddBindingBody {
  name: string;
  upTo25: number;
  from25upTo50: number;
  from50upTo100: number;
  from100upTo150: number;
}

export interface AddPaperBody {
  name: string;
  blackWhitePrinting: {
    upTo250: number;
    from250upTo500: number;
    from500upTo1000: number;
    from1000: number;
  };
  colorPrinting: {
    upTo250: number;
    from250upTo500: number;
    from500upTo1000: number;
    from1000: number;
  };
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
  payload: { id: string; available: boolean; type: 'paper' | 'binding' };
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
