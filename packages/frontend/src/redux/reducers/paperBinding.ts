import {
  Binding,
  Paper,
  PaperBindingActionTypes,
  PaperBindingActions,
} from '../types/paperBinding';

export interface PaperBindingState {
  papers: Paper[];
  bindings: Binding[];
  status: number | null;
  message: string;
}

export const INITIAL_STATE: PaperBindingState = {
  papers: [],
  bindings: [],
  message: '',
  status: null,
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
      return { ...prevState, ...action.payload };
    case PaperBindingActions.UPDATE_BINDING_PAPER: {
      const papers = [...prevState.papers];
      const bindings = [...prevState.bindings];
      
      if(action.payload.type === 'paper') {
        const index = papers.findIndex(paper => paper._id === action.payload.id);
        papers[index] = {...papers[index], available: action.payload.available};
      } else {
        const index = bindings.findIndex(binding => binding._id === action.payload.id);
        bindings[index] = {...bindings[index], available: action.payload.available};
      }
      return { ...prevState, papers, bindings };
    }
    default:
      return prevState;
  }
}
