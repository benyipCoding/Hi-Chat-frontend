import { store } from '@/store';
import { updateMessagesBySelf } from '@/store/conversationSlice';
import {
  addInvitationsRecord,
  fetchFriendsThunk,
  fetchInvitationsThunk,
  setUntreatedCount,
} from '@/store/friendsSlice';
import { updateMessageReadStatus } from '@/utils/api';
import { SocketEvent } from '@/utils/enum';
import { getLocalStorage } from '@/utils/helpers';
import { Invitation, Message, Tokens } from '@/utils/types';
import { createContext } from 'react';
// import { toast } from 'react-toastify';
import { io } from 'socket.io-client';
import { Socket } from 'socket.io-client';

const host = `${window.location.protocol}//${
  window.location.host.split(':')[0]
}:${import.meta.env.VITE_WEBSOCKET_PORT}`;

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
  // toast.error(e.message);
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
});

socket.on(SocketEvent.REFRESH_UNTREATEDCOUNT, () => {
  socket.emit(SocketEvent.REFRESH_UNTREATEDCOUNT);
});

socket.on(SocketEvent.MESSAGE_DELIVER, (e: Message) => {
  const state = store.getState();
  if (!state.conversation.currentConversation) return;
  store.dispatch(updateMessagesBySelf(e));
  // 添加消息已阅逻辑
  updateMessageReadStatus(e.id);
});

export const SocketContext = createContext<Socket>(socket);
