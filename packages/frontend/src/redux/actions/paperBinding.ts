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

const setPaperBindingResponse = (
  message: string,
  status: number | null
): PaperBindingActionTypes => ({
  type: PaperBindingActions.SET_PAPER_BINDING_RESPONSE,
  payload: { message, status },
});

export const resetPaperBindingResponse = (dispatch: AppThunkDispatch) =>
  dispatch(setPaperBindingResponse('', null));

export const updatePaperBindingPrice = (
  type: 'paper' | 'binding',
  patchData: {
    id: string;
    option: string;
    value: number;
  }
) => async (dispatch: AppThunkDispatch) => {
  const { data, status } = await axios.patch<{
    message: string;
  }>(`/pricing/${type}`, patchData);
  dispatch(setPaperBindingResponse(data.message, status));
};

export const updatePaperBindingAvailability = (
  type: 'paper' | 'binding',
  id: string,
  available: boolean
) => async (dispatch: AppThunkDispatch) => {
  const { data, status } = await axios.patch<{
    message: string;
  }>(`/pricing/${type}/${available}/${id}`);
  
  if (status === 200) {
    dispatch({
      type: PaperBindingActions.UPDATE_BINDING_PAPER,
      payload: { id, available, type },
    });
  }

  dispatch(setPaperBindingResponse(data.message, status));
};
