// import { useContext } from 'react';
import AvatarDesc from '../Avatar/AvatarDesc';
// import { useTranslate } from '@/hooks/useTranslate';
import { FriendshipStatus, User } from '@/utils/types';
// import { CommonContext } from '@/context/CommonContext';
import Avatar, { defaultAvatar } from '../Avatar/Avatar';

interface UserItemProps {
  user: User;
  lastMessage: string;
  updateAt?: Date;
  status?: FriendshipStatus;
  sender?: User;
}

const UserItem: React.FC<UserItemProps> = ({
  user,
  lastMessage,
  updateAt,
  status,
  sender,
}) => {
  // const { swipeToDetail } = useTranslate();
  // const divs = useContext(CommonContext);

  // const swipeToFriendsProfile = (friend: User) => {
  //   swipeToDetail(divs!);
  //   console.log(friend);
  // };
  return (
    <section
      className="flex gap-2 p-2 rounded-md cursor-pointer md:hover:bg-[#0000005e] md:hover:shadow-[#ec923134] md:hover:shadow-md"
      key={user?.email}
    >
      <Avatar src={user?.avatar || defaultAvatar} userName={user?.name} />
      <AvatarDesc
        userName={user?.name || ''}
        lastMessage={lastMessage}
        updateAt={updateAt}
        status={status}
        sender={sender}
      />
    </section>
  );
};

export default UserItem;
