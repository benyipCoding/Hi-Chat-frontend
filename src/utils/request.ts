import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { CustomAxiosResponse, ErrorData, Tokens } from './types';
import { delLocalStorage, getLocalStorage, setLocalStorage } from './helpers';

const baseURL =
  import.meta.env.VITE_APP_BASE_URL + import.meta.env.VITE_GLOBAL_PREFIX;
// console.log({ baseURL });

const axiosInstance = axios.create({
  baseURL,
  //   withCredentials: true,
});

// add request interceptors
axiosInstance.interceptors.request.use(
  function (config) {
    // actions before sending request
    // console.log('before sending request...');
    const tokens: Tokens = JSON.parse(getLocalStorage() as string);
    if (tokens) {
      config.headers.Authorization = `Bearer ${tokens.accessToken}`;
    }
    return config;
  },
  function (error) {
    // actions against request error
    console.log('request error...');
    return Promise.reject(error);
  }
);

// add response interceptors
axiosInstance.interceptors.response.use(
  function (response) {
    // actions for success response
    // jwt tokens rotation
    if ('tokens' in response.data) {
      setLocalStorage(response.data.tokens);
      delete response.data.tokens;
    }
    return response.data;
  },
  function (error: AxiosError) {
    // HttpStatus > 200 will trigger this function
    // actions against response error
    const errorData: ErrorData = {
      data:
        (error.response?.data as { data: string }).data ||
        'Internal Exceptions',
      message: error.message,
      status: error.response?.status as number,
      code: error.code as string,
    };
    if (errorData.status === 401) {
      console.log('remove token');
      delLocalStorage();
    }
    return Promise.reject(errorData);
  }
);

export default axiosInstance;

// customize response type version
export function request<T = string>(config: AxiosRequestConfig) {
  return axiosInstance.request<T, CustomAxiosResponse<T>>(config);
}
// add get stream data function
export function requestStream(url: string, method: string = 'GET') {
  const fullpath = baseURL + url;
  const tokens: Tokens = JSON.parse(getLocalStorage() as string);

  return fetch(fullpath, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokens.accessToken || ''}`,
    },
  });
}
