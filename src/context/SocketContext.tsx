/* eslint-disable @typescript-eslint/no-explicit-any */
import { store } from '@/store';
import {
  fetchUnReadGroupMessagesThunk,
  updateMessagesBySelf,
} from '@/store/conversationSlice';
import {
  addInvitationsRecord,
  fetchFriendsThunk,
  fetchInvitationsThunk,
  setUntreatedCount,
} from '@/store/friendsSlice';
import { fetchGroupConvList } from '@/store/groupConversationSlice';
import {
  getConversationList,
  postUpdateGroupMessageReadStatus,
  updateMessageReadStatus,
} from '@/utils/api';
import { SocketEvent } from '@/utils/enum';
import { getLocalStorage } from '@/utils/helpers';
import { Invitation, Message, Tokens } from '@/utils/types';
import { createContext } from 'react';
import { io } from 'socket.io-client';
import { Socket } from 'socket.io-client';

// const host = `${window.location.protocol}//${
//   window.location.host.split(':')[0]
// }:${import.meta.env.VITE_WEBSOCKET_PORT}`;

const host = import.meta.env.VITE_WEBSOCKET_URL;

export const socket = io(host, {
  autoConnect: false,
  auth: (cb) => {
    const token: Tokens = JSON.parse(getLocalStorage() as string);
    cb({ token: token?.accessToken });
  },
});

socket.on(SocketEvent.CONNECT, () => {
  console.log('socket connect successfully!');
});

socket.on(SocketEvent.DISCONNECT, () => {
  console.log('socket has been disconnected!');
});

socket.on(SocketEvent.ERROR, (e) => {
  console.log(e.message);
});

socket.on(SocketEvent.MESSAGE, (e) => {
  console.log('this is message event', e);
});

socket.on(SocketEvent.FRIEND_REQUEST, (e) => {
  console.log('this is friend request event', e);
  store.dispatch(fetchInvitationsThunk());
  store.dispatch(fetchFriendsThunk());
});

socket.on(SocketEvent.ADD_FRIEND_REQUEST_RECORD, (e: Invitation) => {
  store.dispatch(addInvitationsRecord(e));
});

socket.on(SocketEvent.UNTREATED_INVITATIONS, (e) => {
  console.log(SocketEvent.UNTREATED_INVITATIONS, { e });
  store.dispatch(setUntreatedCount(e.length));
  store.dispatch(fetchInvitationsThunk());
});

socket.on(SocketEvent.REFRESH_UNTREATEDCOUNT, () => {
  socket.emit(SocketEvent.REFRESH_UNTREATEDCOUNT);
});

socket.on(SocketEvent.MESSAGE_DELIVER, async (e: Message) => {
  const state = store.getState();
  if (
    state.conversation.currentConversation &&
    state.conversation.currentConversation.id === (e as any).conversation.id &&
    state.conversation.currentConversation.name === (e as any).conversation.name
  ) {
    store.dispatch(updateMessagesBySelf(e));
    // 添加消息已阅逻辑
    await updateMessageReadStatus(e.id);
    getConversationList();
  } else {
    getConversationList();
  }
});

socket.on(SocketEvent.GROUP_MESSAGE_DELIVER, async (e) => {
  // console.log('这里是客户端socket接收到群组信息', e);
  const state = store.getState();
  if (
    state.conversation.currentConversation &&
    state.conversation.currentConversation.id ===
      (e as any).groupConversation.id &&
    state.conversation.currentConversation.name ===
      (e as any).groupConversation.name
  ) {
    store.dispatch(updateMessagesBySelf(e));
    // 添加消息已阅逻辑
    // await updateMessageReadStatus(e.id);
    await postUpdateGroupMessageReadStatus(e.id);
    store.dispatch(fetchGroupConvList());
  } else {
    store.dispatch(fetchGroupConvList());
    store.dispatch(fetchUnReadGroupMessagesThunk());
  }
});

export const SocketContext = createContext<Socket>(socket);
