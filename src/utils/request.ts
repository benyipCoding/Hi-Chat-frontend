import axios, { AxiosError } from 'axios';

export type ErrorData = {
  data: string;
  message: string;
  status: number;
  code: string;
};

const baseURL = import.meta.env.VITE_APP_BASE_URL;

const axiosInstance = axios.create({
  baseURL,
  //   withCredentials: true,
});

// add request interceptors
axiosInstance.interceptors.request.use(
  function (config) {
    // actions before sending request
    return config;
  },
  function (error) {
    // actions against request error
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
    return Promise.reject(errorData);
  }
);

export default axiosInstance;
