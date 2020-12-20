import Axios from 'axios';
import { store } from '../redux/index';
import { authSuccess, authReset } from '@actions';

const url = process.env.REACT_APP_BACKEND_URL;

const ax = Axios.create({
  withCredentials: true,
  validateStatus: () => true,
  xsrfCookieName: '_csrf',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  baseURL: url,
});

const rejectPromise = (error: object | string) => Promise.reject(error);

ax.interceptors.request.use(config => {
  const newConfig = { ...config };
  const token = `Bearer ${store.getState().auth.token}`;
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
      store.dispatch(authReset());
      return rejectPromise(error);
    }

    if (errorStatus === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      return axios.get('/auth/refresh').then(res => {
        if (res.data.accessToken) {
          const { accessToken } = res.data;
          // dispatch refresh success
          store.dispatch(authSuccess(accessToken));
          // return originalRequest object with Axios.
          return axios(originalRequest);
        }

        store.dispatch(authReset());

        return rejectPromise(error);
      });
    }

    return rejectPromise(error);
  }
);

export const axios = ax;