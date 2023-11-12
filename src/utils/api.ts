import { AuthFormDefaultValues } from '@/components/Forms/AuthForm';
import { request } from './request';
import { RegisterResponse, SignInResponse, User } from './types';

export const postRegisterUser = (data: AuthFormDefaultValues) => {
  return request<RegisterResponse>({
    method: 'post',
    url: '/auth/register',
    data,
  });
};

export const postSignIn = (data: AuthFormDefaultValues) => {
  return request<SignInResponse>({
    method: 'post',
    url: '/auth/signIn',
    data,
  });
};

export const getUserInfo = () => {
  return request<User>({
    method: 'get',
    url: '/user/profile',
  });
};

export const getFriendList = () => {
  return request<User[]>({
    method: 'get',
    url: '/user/friendList',
  });
};

export const getMockFriends = () => {
  return request({
    method: 'get',
    url: '/user/mockFriends',
  });
};
