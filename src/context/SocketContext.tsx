import { getLocalStorage } from '@/utils/helpers';
import { createContext } from 'react';
import { io } from 'socket.io-client';
import { Socket } from 'socket.io-client';

const host = `${window.location.protocol}//${
  window.location.host.split(':')[0]
}:${import.meta.env.VITE_WEBSOCKET_PORT}`;
const token = getLocalStorage();

export const socket = io(host, {
  auth: {
    token,
  },
  autoConnect: false,
});

export const SocketContext = createContext<Socket>(socket);
