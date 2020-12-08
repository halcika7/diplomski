import {
  Binding,
  Paper,
  PaperBindingActionTypes,
  PaperBindingActions,
} from '../types/paperBinding';

export const InitialBindingErrors = {
  name: '',
  upTo25: '',
  from25upTo50: '',
  from50upTo100: '',
  from100upTo150: '',
};

export const InitialPaperErrors = {
  name: '',
  blackWhitePrinting: {
    upTo250: '',
    from250upTo500: '',
    from500upTo1000: '',
    from1000: '',
  },
  colorPrinting: {
    upTo250: '',
    from250upTo500: '',
    from500upTo1000: '',
    from1000: '',
  },
};

export interface BindingErrors {
  name: string;
  upTo25: string;
  from25upTo50: string;
  from50upTo100: string;
  from100upTo150: string;
}

export interface PaperErrors {
  name: string;
  blackWhitePrinting: {
    upTo250: string;
    from250upTo500: string;
    from500upTo1000: string;
    from1000: string;
  };
  colorPrinting: {
    upTo250: string;
    from250upTo500: string;
    from500upTo1000: string;
    from1000: string;
  };
}

export interface PaperBindingState {
  papers: Paper[];
  bindings: Binding[];
  status: number | null;
  message: string;
  bindingErrors: BindingErrors;
  paperErrors: PaperErrors;
}

export const INITIAL_STATE: PaperBindingState = {
  papers: [],
  bindings: [],
  message: '',
  status: null,
  bindingErrors: InitialBindingErrors,
  paperErrors: InitialPaperErrors,
};

export function PaperBindingReducer(
  prevState = INITIAL_STATE,
  action: PaperBindingActionTypes
) {
  switch (action.type) {
    case PaperBindingActions.SET_PAPER_BINDINGS:
      return { ...INITIAL_STATE, ...action.payload };
    case PaperBindingActions.SET_PAPERS:
      return { ...INITIAL_STATE, papers: action.payload };
    case PaperBindingActions.SET_BINDINGS:
      return { ...INITIAL_STATE, bindings: action.payload };
    case PaperBindingActions.SET_PAPER_BINDING_RESPONSE:
      return {
        ...prevState,
        ...action.payload,
        bindingErrors:
          action.payload.status === 200
            ? InitialBindingErrors
            : prevState.bindingErrors,
      };
    case PaperBindingActions.UPDATE_BINDING_PAPER: {
      const papers = [...prevState.papers];
      const bindings = [...prevState.bindings];

      if (action.payload.type === 'paper') {
        const index = papers.findIndex(
          paper => paper._id === action.payload.id
        );
        papers[index] = {
          ...papers[index],
          available: action.payload.available,
        };
      } else {
        const index = bindings.findIndex(
          binding => binding._id === action.payload.id
        );
        bindings[index] = {
          ...bindings[index],
          available: action.payload.available,
        };
      }

      return { ...prevState, papers, bindings };
    }
    case PaperBindingActions.SET_BINDING_ERRORS:
      return {
        ...prevState,
        bindingErrors: { ...prevState.bindingErrors, ...action.payload },
      };
    case PaperBindingActions.SET_PAPER_ERRORS:
      return {
        ...prevState,
        paperErrors: { ...prevState.paperErrors, ...action.payload },
      };
    default:
      return prevState;
  }
}
