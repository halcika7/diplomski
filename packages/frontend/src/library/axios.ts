import Axios from 'axios';
import { store } from '../redux/index';
import { authSuccess, authReset } from '@actions';
import { AnyDictionary } from '@job/common';

const url = process.env.REACT_APP_BACKEND_URL;

const ax = Axios.create({
  withCredentials: true,
  validateStatus: () => true,
  baseURL: `${url}`,
});

const rejectPromise = (error: AnyDictionary | string) => Promise.reject(error);

ax.interceptors.request.use(config => {
  const newConfig = { ...config };
  const tok = localStorage.getItem('isaujuis');
  const token = `Bearer ${tok}`;
  newConfig.headers = {
    ...newConfig.headers,
    common: {
      ...newConfig.headers.common,
      Authorization: token,
    },
  };

  return newConfig;
});

ax.interceptors.response.use(
  response => response,
  error => {
    const originalRequest = error.config;
    const errorStatus = error.response.status;
    const refreshUrl = `${url}/auth/refresh`;

    if (errorStatus === 401 && originalRequest.url === refreshUrl) {
      localStorage.removeItem('isaujuis');
      store.dispatch(authReset());
      return rejectPromise(error);
    }

    if (errorStatus === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axios.get('/auth/refresh').then(res => {
        if (res.data.accessToken) {
          const { accessToken } = res.data;
          // dispatch refresh success
          localStorage.setItem('isaujuis', accessToken);
          store.dispatch(authSuccess(accessToken));
          // return originalRequest object with Axios.
          return axios(originalRequest);
        }

        localStorage.removeItem('isaujuis');
        store.dispatch(authReset());

        return rejectPromise(error);
      });
    }

    return rejectPromise(error);
  }
);

export const axios = ax;
