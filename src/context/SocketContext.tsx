import { SocketEvent } from '@/utils/enum';
import { getLocalStorage } from '@/utils/helpers';
import { Tokens } from '@/utils/types';
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
    cb({ token: token.accessToken });
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
  console.log(e);
});

export const SocketContext = createContext<Socket>(socket);
