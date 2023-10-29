import { AuthFormDefaultValues } from '@/components/Forms/AuthForm';
import axiosInstance from './request';

export const getTemp = () => {
  return axiosInstance.get(`/temp/123`);
};

export const postRegisterUser = (data: AuthFormDefaultValues) => {
  return axiosInstance.post('/auth/register', data);
};
