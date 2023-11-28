import { FriendshipStatus } from '@/utils/types';

export const StatusMap = new Map([
  [FriendshipStatus.ACCEPT, 'text-green-400'],
  [FriendshipStatus.REJECT, 'text-rose-500'],
  [FriendshipStatus.PENDING, 'text-orange-400'],
  [FriendshipStatus.SENT, 'text-yellow-200'],
]);
