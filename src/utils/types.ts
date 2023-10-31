export interface CustomAxiosResponse<T> {
  data: T;
  message: string;
  status: number;
}
export type RegisterResponse = { email: string; id: string; name: string };

export type SignInResponse = { accessToken: string; refreshToken: string };

export type User = {
  id: string;
  name: string;
  email: string;
};

export type ErrorData = {
  data: string;
  message: string;
  status: number;
  code: string;
};
