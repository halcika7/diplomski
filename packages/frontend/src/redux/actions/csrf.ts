import { axios } from '@axios';

import { AppThunkDispatch } from '../AppThunkDispatch';

export const getCSRF = async (_: AppThunkDispatch): Promise<any> => {
  const resp = await axios.get('/get_csrf');
  console.log('resp', resp);
};
