import AvatarDesc from '../Avatar/AvatarDesc';
import { FriendshipStatus, User } from '@/utils/types';
import Avatar, { defaultAvatar } from '../Avatar/Avatar';

interface UserItemProps {
  user: User;
  lastMessage?: string;
  updateAt?: Date;
  status?: FriendshipStatus;
  sender?: User;
  invitationId?: number;
  showDescription?: boolean;
  isFriendList?: boolean;
}

const UserItem: React.FC<UserItemProps> = ({
  user,
  lastMessage,
  updateAt,
  status,
  sender,
  invitationId,
  showDescription = true,
  isFriendList = false,
}) => {
  return (
    <section className="flex gap-2 p-2 rounded-md cursor-pointer md:hover:bg-[#0000005e] md:hover:shadow-[#ec923134] md:hover:shadow-md">
      <Avatar src={user?.avatar || defaultAvatar} userName={user?.name} />
      <AvatarDesc
        userName={user.nickname || user.name}
        lastMessage={lastMessage!}
        updateAt={updateAt}
        status={status}
        sender={sender}
        invitationId={invitationId}
        showDescription={showDescription}
        isFriendList={isFriendList}
        user={user}
      />
    </section>
  );
};

export default UserItem;
