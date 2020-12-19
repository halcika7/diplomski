import { axios } from '@axios';
import {
  InitialBindingErrors,
  InitialPaperErrors,
} from '@reducers/paperBinding';

// types
import { AppThunkDispatch } from '../AppThunkDispatch';
import {
  PaperBindingActionTypes,
  PaperBindingActions,
} from '../types/paperBinding';

import {
  AddBindingBody,
  AddPaperBody,
  PaperFront as Paper,
  BindingFront as Binding,
  PaperErrors,
  BindingErrors,
  PaperBinding,
  UpdatePriceBindingPaper,
} from '@job/common';

export const setPaperBindings = (data: {
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
  type: PaperBinding,
  patchData: UpdatePriceBindingPaper
) => async (dispatch: AppThunkDispatch) => {
  const { data, status } = await axios.patch<{
    message: string;
  }>(`/pricing/${type}`, patchData);
  dispatch(setPaperBindingResponse(data.message, status));
};

export const updatePaperBindingAvailability = (
  type: PaperBinding,
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

const setBindingErrors = (
  payload: Partial<BindingErrors>
): PaperBindingActionTypes => ({
  type: PaperBindingActions.SET_BINDING_ERRORS,
  payload,
});

export const resetBindingErrors = (dispatch: AppThunkDispatch) =>
  dispatch(setBindingErrors(InitialBindingErrors));

export const addBinding = (postData: AddBindingBody) => async (
  dispatch: AppThunkDispatch
) => {
  const { data, status } = await axios.post<{
    message: string;
    errors: Partial<BindingErrors>;
  }>('/pricing/binding', postData);

  if (status === 200) {
    dispatch(setPaperBindingResponse(data.message, status));
  } else {
    dispatch(setBindingErrors(data.errors));
  }
};

const setPaperErrors = (
  payload: Partial<PaperErrors>
): PaperBindingActionTypes => ({
  type: PaperBindingActions.SET_PAPER_ERRORS,
  payload,
});

export const resetPaperErrors = (dispatch: AppThunkDispatch) =>
  dispatch(setPaperErrors(InitialPaperErrors));

export const addPaper = (postData: AddPaperBody) => async (
  dispatch: AppThunkDispatch
) => {
  const { data, status } = await axios.post<{
    message: string;
    errors: Partial<PaperErrors>;
  }>('/pricing/paper', postData);

  if (status === 200) {
    dispatch(setPaperBindingResponse(data.message, status));
  } else {
    dispatch(setPaperErrors(data.errors));
  }
};
