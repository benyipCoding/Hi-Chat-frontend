import { User } from '@/utils/types';
import { motion } from 'framer-motion';
import Avatar, { defaultAvatar } from '../Avatar/Avatar';
import AvatarDesc from '../Avatar/AvatarDesc';

interface ChooseFriendsItemProps {
  user: User;
  onClick: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ChooseFriendsItem: React.FC<ChooseFriendsItemProps> = ({
  user,
  onClick,
}) => {
  return (
    <motion.label
      whileTap={{ scale: 0.95 }}
      htmlFor={user.id}
      className="flex items-center gap-4 cursor-pointer md:hover:bg-gradient-to-r from-slate-200 to-gray-200 md:hover:shadow-[#ec923134] md:hover:shadow-md p-2 rounded-md"
    >
      <input
        type="checkbox"
        id={user.id}
        className="w-5 h-5 outline-none focus-visible:outline-none"
        style={{
          borderRadius: '50%',
        }}
        checked={user.groupSelected}
        onChange={(e) => onClick(e)}
      />
      <Avatar src={user.avatar || defaultAvatar} />
      <AvatarDesc
        userName={user.nickname || user.displayName}
        hiddenBorder={true}
        style={{
          color: '#333',
        }}
      />
    </motion.label>
  );
};

export default ChooseFriendsItem;
