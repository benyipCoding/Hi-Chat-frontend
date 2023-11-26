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
  email?: string;
  avatar?: string;
};

export type UserWithChecked = User & { checked: boolean };

export type Conversation = {
  id: number;
  users: string[]; // user ids array
  createAt: number;
  cover: string;
  name: string;
  lastMessage: string;
  lastMessageAt: Date;
  messages: number[]; // message ids array
};

export type Message = {
  id: number;
  content: string;
  image?: string;
  createAt: Date;
  sender: string;
  seenByUsers?: string[];
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

export type Invitation = {
  avatar: string;
  message: string;
  createAt: Date;
  status: FriendshipStatus;
};

export enum FriendshipStatus {
  ACCEPT = 'accept',
  PENDING = 'pending',
  SENT = 'sent',
  REJECT = 'reject',
  SEEN = 'seen',
}

export type InvitationRecord = {
  id: number;
  sender: User;
  receiver: User;
  createAt: Date;
  greetings: string;
  status: FriendshipStatus;
};
