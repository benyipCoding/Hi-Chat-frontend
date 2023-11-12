import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { CustomAxiosResponse, ErrorData, Tokens } from './types';
import { delLocalStorage, getLocalStorage } from './helpers';

const baseURL = window.location.origin + '/api';
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
    const token: Tokens = JSON.parse(getLocalStorage() as string);
    if (token) config.headers.Authorization = `Bearer ${token.accessToken}`;
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
