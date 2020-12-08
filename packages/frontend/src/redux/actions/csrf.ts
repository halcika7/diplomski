import { axios } from '@axios';

export const getCSRF = async () => {
  await axios.get('/get_csrf');
};
