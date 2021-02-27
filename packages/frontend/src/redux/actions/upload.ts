import { axios } from '@axios';

// types
import { AppThunkDispatch } from '../AppThunkDispatch';
import { UploadActions, UploadActionTypes } from '../types/upload';
import { CartFront as Cart } from '@job/common';
import { setCart } from './cart';
import { UploadFileErrors, InitialUploadErrors } from '../reducers/upload';

const setBindingsPapers = (data: {
  bindings: string[];
  papers: string[];
}): UploadActionTypes => ({
  type: UploadActions.SET_BINDINGS_PAPERS,
  payload: data,
});

export const getPapersBindings = async (dispatch: AppThunkDispatch) => {
  const { data } = await axios.get<{
    papers: string[];
    bindings: string[];
  }>('/upload/binding-papers');
  dispatch(setBindingsPapers(data));
};

const setUploadErrors = (
  errors: Partial<UploadFileErrors>
): UploadActionTypes => ({
  type: UploadActions.SET_UPLOAD_ERRORS,
  payload: errors,
});

export const resetUploadErrors = (dispatch: AppThunkDispatch) =>
  dispatch(setUploadErrors(InitialUploadErrors));

const setUploadStatus = (
  message: string,
  status: number | null
): UploadActionTypes => ({
  type: UploadActions.SET_UPLOAD_STATUS,
  payload: { message, status },
});

export const resetUploadStatus = (dispatch: AppThunkDispatch) =>
  dispatch(setUploadStatus('', null));

export const uploadFile = (formData: FormData) => async (
  dispatch: AppThunkDispatch
) => {
  dispatch(setUploadStatus('', null));

  const { data, status } = await axios.put<{
    cart: Cart;
    errors?: Partial<UploadFileErrors>;
    err?: string;
  }>('/upload/', formData, {
    headers: {
      'content-type': 'multipart/form-data',
      'Access-Control-Allow-Origin': '*',
    },
  });

  if (data.errors) {
    dispatch(setUploadStatus('', status));
    dispatch(setUploadErrors(data.errors));
  } else if (data.err) {
    dispatch(setUploadStatus(data.err, status));
  } else {
    dispatch(setUploadStatus('File uploaded', status));
    dispatch(resetUploadErrors);
    dispatch(setCart(data.cart));
  }
};
