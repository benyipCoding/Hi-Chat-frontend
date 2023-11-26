import { store } from '@/store';
import { addInvitationsRecord } from '@/store/friendsSlice';
import { SocketEvent } from '@/utils/enum';
import { getLocalStorage } from '@/utils/helpers';
import { Invitation, Tokens } from '@/utils/types';
import { createContext } from 'react';
import { toast } from 'react-toastify';
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
  toast.error(e.message);
});

socket.on(SocketEvent.MESSAGE, (e) => {
  console.log('this is message event', e);
});

socket.on(SocketEvent.FRIEND_REQUEST, (e) => {
  console.log('this is friend request event', e);
});

socket.on(SocketEvent.ADD_FRIEND_REQUEST_RECORD, (e: Invitation) => {
  store.dispatch(addInvitationsRecord(e));
});

export const SocketContext = createContext<Socket>(socket);
