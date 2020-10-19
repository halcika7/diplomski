import { axios } from '@axios';

// types
import { AppThunkDispatch } from '../AppThunkDispatch';
import { UploadActions, UploadActionTypes } from '../types/upload';
import { Cart } from '../types/cart';
import { setCart } from './cart';

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

export const uploadFile = (formData: FormData) => async (
  dispatch: AppThunkDispatch
) => {
  const { data } = await axios.post<{
    cart: Cart;
  }>('/upload/', formData, {
    headers: { 'content-type': 'multipart/form-data' },
  });
  console.log("data", data)
  dispatch(setCart(data.cart));
};
