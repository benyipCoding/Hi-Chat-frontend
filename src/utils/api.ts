import axios from 'axios';

const baseURL = import.meta.env.VITE_APP_BASE_URL;

const axiosInstance = axios.create({
  baseURL,
  //   withCredentials: true,
});

export default axiosInstance;

export const getTemp = () => {
  return axiosInstance.get(`/temp/123`);
};
