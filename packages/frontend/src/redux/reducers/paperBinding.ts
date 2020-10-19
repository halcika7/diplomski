import {
  Binding,
  Paper,
  PaperBindingActionTypes,
  PaperBindingActions,
} from '../types/paperBinding';

export interface PaperBindingState {
  papers: Paper[];
  bindings: Binding[];
}

export const INITIAL_STATE: PaperBindingState = {
  papers: [],
  bindings: [],
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
    default:
      return prevState;
  }
}
