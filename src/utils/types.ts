export interface CustomAxiosResponse<T> {
  data: T;
  message: string;
  status: number;
}
export type RegisterResponse = { email: string; id: string; name: string };

export type SignInResponse = { accessToken: string; refreshToken: string };

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export type User = {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  gender?: Gender;
};

export type UserWithChecked = User & { checked: boolean };

export type Conversation = {
  id: number;
  creator: User;
  recipient: User;
  lastMessageAt: Date;
  updateAt: Date;
  createAt: Date;
};

export type Message = {
  id: number;
  content: string;
  image?: string;
  createAt: Date;
  sender: User;
  seenByUsers?: string[];
};

export type PostMsgData = {
  content: string;
  conversationId: number;
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

export enum FriendshipStatus {
  ACCEPT = 'accept',
  PENDING = 'pending',
  SENT = 'sent',
  REJECT = 'reject',
  SEEN = 'seen',
}

export type Invitation = {
  id: number;
  sender: User;
  receiver: User;
  createAt: Date;
  updateAt: Date;
  greetings: string;
  status: FriendshipStatus;
};
