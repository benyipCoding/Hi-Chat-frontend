import { useContext } from 'react';
import AvatarDesc from '../Avatar/AvatarDesc';
import { useTranslate } from '@/hooks/useTranslate';
import { User } from '@/utils/types';
import { CommonContext } from '@/context/CommonContext';
import Avatar from '../Avatar/Avatar';

interface UserItemProps {
  user: User;
}

const UserItem: React.FC<UserItemProps> = ({ user }) => {
  const { swipeToDetail } = useTranslate();
  const divs = useContext(CommonContext);

  const swipeToFriendsProfile = (friend: User) => {
    swipeToDetail(divs!);
    console.log(friend);
  };
  return (
    <section
      className="flex gap-2 p-2 rounded-md cursor-pointer md:hover:bg-[#0000005e] md:hover:shadow-[#ec923134] md:hover:shadow-md"
      key={user?.email}
      onClick={() => swipeToFriendsProfile(user)}
    >
      <Avatar
        src={user?.avatar || `/images/avatar/1.jpeg`}
        userName={user?.name}
      />
      <AvatarDesc
        userName={user?.name || ''}
        lastMessage="123456"
        showLastMessage={false}
      />
    </section>
  );
};

export default UserItem;
