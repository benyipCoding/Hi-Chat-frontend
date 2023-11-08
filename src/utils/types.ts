export interface CustomAxiosResponse<T> {
  data: T;
  message: string;
  status: number;
}
export type RegisterResponse = { email: string; id: string; name: string };

export type SignInResponse = { accessToken: string; refreshToken: string };

export type User = {
  id: number;
  name: string;
  email?: string;
  avatar: string;
} | null;

export type UserList = User[];

export type Conversation = {
  id?: number;
  creator: User;
  recipient: User;
  createdAt: number;
  lastMessageSent?: string;
};

export type ErrorData = {
  data: string;
  message: string;
  status: number;
  code: string;
};

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};
