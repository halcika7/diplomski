export enum PaperBindingActions {
  SET_PAPER_BINDINGS = 'SET_PAPER_BINDINGS',
  SET_PAPERS = 'SET_PAPERS',
  SET_BINDINGS = 'SET_BINDINGS',
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

export type PaperBindingActionTypes = SetPaperBinding | SetPapers | SetBindings;
