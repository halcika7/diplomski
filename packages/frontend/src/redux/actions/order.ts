import { axios } from '@axios';

// types
import { AppThunkDispatch } from '../AppThunkDispatch';

export const postOrder = (orderedFor: string) => async (
  _: AppThunkDispatch
) => {
  const { data } = await axios.post<{}>('/order/', { orderedFor });
  console.log('data', data);
};
