import { AuthFormDefaultValues } from '@/components/Forms/AuthForm';
import { request, requestStream } from './request';
import {
  Conversation,
  FriendshipStatus,
  Invitation,
  Message,
  PostMsgData,
  RegisterResponse,
  SignInResponse,
  User,
} from './types';
import { store } from '@/store';
import {
  setConversations,
  setUnreadCountForConversations,
} from '@/store/conversationSlice';

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

export const postLogout = () => {
  return request({
    method: 'post',
    url: '/auth/logout',
  });
};

export const getStrangerList = () => {
  return request<User[]>({
    url: '/user/all-stranger',
  });
};

export const postFriendInvitation = (data: {
  userIds: string[];
  greetings: string;
}) => {
  return request<number>({
    method: 'post',
    url: '/friends/invitation',
    data,
  });
};

export const getInvitations = () => {
  return request<Invitation[]>({
    url: '/friends/users-invitations',
  });
};

export const getTestNormal = () => {
  return request({
    url: '/auth/connect-normal',
  });
};

export const getTestSSE = () => {
  return request({
    url: '/auth/connect-sse',
  });
};

export function postChangeFriendshipStatus(
  invitationId: number,
  status: FriendshipStatus.ACCEPT | FriendshipStatus.REJECT
) {
  return request({
    method: 'post',
    url: '/friends/changeFriendship',
    data: {
      id: invitationId,
      status,
    },
  });
}

export function postCreateConversation(target: User) {
  return request<Conversation>({
    method: 'post',
    url: '/conversation/create',
    data: {
      target,
    },
  });
}

export function postCreateMessage(data: PostMsgData) {
  return request<Message>({
    method: 'post',
    url: '/message/create',
    data,
  });
}

export function getMessagesByConversation(conversationId: number) {
  return request<Message[]>({
    url: '/message/queryMessagesByConversation',
    params: { conversationId },
  });
}

export function updateMessageReadStatus(messageId: number) {
  return request({
    method: 'post',
    url: '/message/updateMessageReadStatus',
    data: { messageId },
  });
}

export async function getConversationList() {
  const res = await requestStream('/conversation/get-list');
  const reader = res.body?.getReader();
  const decoder = new TextDecoder();
  while (reader) {
    const { done, value } = await reader.read();
    if (done) break;
    const payload = decoder
      .decode(value)
      .split(';')
      .filter((str) => str !== '');
    payload.forEach((chunk) => {
      const data = JSON.parse(chunk);
      if (data.type === 'conversations') {
        store.dispatch(setConversations(data.data as Conversation[]));
      }
      if (data.type === 'count') {
        store.dispatch(setUnreadCountForConversations(data.data));
      }
    });
  }

  return;
}
