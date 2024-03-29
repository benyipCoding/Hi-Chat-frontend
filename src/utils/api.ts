import { AuthFormDefaultValues } from '@/components/Forms/AuthForm';
import { request, requestStream } from './request';
import {
  ChangeNicknameDto,
  Conversation,
  CreateGroupConversationDto,
  FriendshipStatus,
  GroupConversation,
  Invitation,
  Message,
  PostMsgData,
  RegisterResponse,
  RenameDto,
  SignInResponse,
  UpdateUserInfoDto,
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
  // const state: RootState = store.getState();

  // const conv = state.conversation.currentConversation as Conversation;

  // if (conv && conv.recipient) {
  //   const isSame =
  //     target.id === conv.creator.id || target.id === conv.recipient.id;
  //   if (state.conversation.currentConversation && isSame) {
  //     return Promise.reject('Current conversation is existed');
  //   }
  // }
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
  let payload: string = '';

  while (reader) {
    const { done, value } = await reader.read();
    if (done) break;
    setTimeout(() => {
      payload += decoder.decode(value);
    });
  }
  setTimeout(() => {
    const dataArr = payload.split(';').filter((str) => str !== '');
    dataArr.forEach((chunk) => {
      const data = JSON.parse(chunk);
      if (data.type === 'conversations') {
        store.dispatch(setConversations(data.data as Conversation[]));
      }
      if (data.type === 'count') {
        store.dispatch(setUnreadCountForConversations(data.data));
      }
    });
  });
  return;
}

export function updateMessageStatusByConversationId(conversationId: number) {
  return request({
    url: '/conversation/set-messages-status',
    method: 'post',
    data: {
      conversationId,
    },
  });
}

export function postChangeNickname(data: ChangeNicknameDto) {
  return request<{ nickname: string }>({
    url: '/user/changeNickname',
    method: 'post',
    data,
  });
}

export function postDeleteFriendship(targetUserId: string) {
  return request({
    url: `/friends/delete-friendship/${targetUserId}`,
    method: 'post',
  });
}

export function postUpdateUserInfo(data: UpdateUserInfoDto) {
  return request<User>({
    url: '/user/update-userInfo',
    method: 'post',
    data,
  });
}

export function postUploadAvatar(data: FormData) {
  return request({
    url: '/upload/avatar',
    method: 'post',
    data,
  });
}

export function postCreateGroupConversation(data: CreateGroupConversationDto) {
  return request({
    url: '/group-conversation/create-group',
    method: 'post',
    data,
  });
}

export function getGroupConversations() {
  return request<GroupConversation[]>({
    url: '/group-conversation/get-conv-list',
    method: 'get',
  });
}

export function postCreateGroupMessage(data: PostMsgData) {
  return request<Message>({
    url: '/group-message/create-group-message',
    method: 'post',
    data,
  });
}

export function getMessagesByGroupConvId(groupConvId: number) {
  return request<Message[]>({
    url: `/group-message/queryMessagesByGroupConvId/${groupConvId}`,
  });
}

export function postUpdateGroupMessageReadStatus(groupMsgId: number) {
  return request({
    url: `/group-message/updateMessageReadStatus/${groupMsgId}`,
    method: 'post',
  });
}

export function getUnreadGroupMessageByUserId() {
  return request<Message[]>({
    url: `/group-message/getUnreadGroupMessages`,
  });
}

export function postRenameGroup(data: RenameDto) {
  return request({
    url: '/group-conversation/rename',
    method: 'post',
    data,
  });
}

export function postDeleteGroup(groupConvId: number) {
  return request({
    url: '/group-conversation/delete-group',
    method: 'post',
    data: {
      groupConvId,
    },
  });
}
