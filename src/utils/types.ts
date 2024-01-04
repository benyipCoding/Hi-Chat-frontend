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
  NULL = '',
}

export type User = {
  id: string;
  name: string;
  email?: string;
  avatar?: string;
  gender?: Gender;
  nickname: string;
  displayName: string;
  groupSelected?: boolean;
};

export type UserWithChecked = User & { checked: boolean };

export type Conversation = {
  id: number;
  creator: User;
  recipient: User;
  lastMessageAt: Date;
  lastMessage: Message;
  updateAt: Date;
  createAt: Date;
  unReadCount?: number;
  name: string;
};

export type GroupConversation = Omit<Conversation, 'recipient'> & {
  members: User[];
};

export type Message = {
  id: number;
  content: string;
  image?: string;
  createAt: Date;
  sender: User;
  seenByUsers?: string[];
  senderName: string;
  sender_name?: string;
  create_at?: Date;
  sender_id?: string;
  group_conversation_id?: number;
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

export type ChangeNicknameDto = {
  targetUserId: string;
  nickname: string;
};

export type UpdateUserInfoDto = {
  displayName: string;
  email: string;
  gender: Gender;
};

export enum DropMenuAction {
  GROUP_CHAT = 'Group chat',
  ADD_FRIENDS = 'Add friends',
  LOGOUT = 'Logout',
  CHOOSE = 'Choose your friends',
}

export type CreateGroupConversationDto = {
  members: string[];
  groupName: string;
};

export type RenameDto = {
  groupName: string;
  groupConvId: number;
};
