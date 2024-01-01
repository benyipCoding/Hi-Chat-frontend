export enum SocketEvent {
  CONNECT = 'connect',
  DISCONNECT = 'disconnect',
  MESSAGE = 'message',
  ERROR = 'connect_error',
  FRIEND_REQUEST = 'friend-request',
  ADD_FRIEND_REQUEST_RECORD = 'add-friend-request-record',
  UNTREATED_INVITATIONS = 'untreated-invitatons',
  REFRESH_UNTREATEDCOUNT = 'refresh-untreated-count',
  MESSAGE_DELIVER = 'message-deliver',
  GROUP_MESSAGE_DELIVER = 'group-message-deliver',
}
