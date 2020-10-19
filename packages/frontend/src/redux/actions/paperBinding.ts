import { axios } from '@axios';

// types
import { AppThunkDispatch } from '../AppThunkDispatch';
import {
  Paper,
  Binding,
  PaperBindingActionTypes,
  PaperBindingActions,
} from '../types/paperBinding';

const setPaperBindings = (data: {
  papers: Paper[];
  bindings: Binding[];
}): PaperBindingActionTypes => ({
  type: PaperBindingActions.SET_PAPER_BINDINGS,
  payload: { ...data },
});

const setPapers = (papers: Paper[]): PaperBindingActionTypes => ({
  type: PaperBindingActions.SET_PAPERS,
  payload: papers,
});

const setBindings = (bindings: Binding[]): PaperBindingActionTypes => ({
  type: PaperBindingActions.SET_BINDINGS,
  payload: bindings,
});

export const getPaperBindings = async (dispatch: AppThunkDispatch) => {
  const { data } = await axios.get<{
    papers: Paper[];
    bindings: Binding[];
  }>('/pricing/');
  dispatch(setPaperBindings(data));
};

export const getPapers = async (dispatch: AppThunkDispatch) => {
  const { data } = await axios.get<{
    papers: Paper[];
  }>('/pricing/papers');
  dispatch(setPapers(data.papers));
};

export const getBindings = async (dispatch: AppThunkDispatch) => {
  const { data } = await axios.get<{
    bindings: Binding[];
  }>('/pricing/bindings');
  dispatch(setBindings(data.bindings));
};
