import { motion } from 'framer-motion';
import Avatar from '../Avatar/Avatar';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import {
  fetchStrangersThunk,
  selectStrangerByName,
  toggleStrangerChecked,
} from '@/store/friendsSlice';
import { UserWithChecked } from '@/utils/types';

interface UserListProps {
  filter?: string;
}

const UserList: React.FC<UserListProps> = ({ filter = '' }) => {
  const dispatch = useDispatch<AppDispatch>();
  const strangers = useSelector((state: RootState) =>
    selectStrangerByName(state, filter)
  );

  useEffect(() => {
    dispatch(fetchStrangersThunk());
  }, []);

  const toggleChecked = (user: UserWithChecked) => {
    dispatch(toggleStrangerChecked(user));
  };

  return (
    <ul className="mt-6 flex-1 overflow-y-auto scroll-bar grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-3 pb-12">
      {strangers.map((user, index) => (
        <motion.li
          whileTap={{ scale: 0.9 }}
          className="relative flex flex-col justify-center items-center gap-1 sm:py-2 rounded-md md:hover:bg-[#0000001b] active:bg-[#0000001e] max-h-[200px]"
          key={index}
        >
          <Avatar
            userName={user?.name}
            fixedSize={true}
            src={user?.avatar ? user.avatar : undefined}
          />
          <p className="text-lg font-sans">{user?.name}</p>
          <input
            type="checkbox"
            className="w-4 h-4 absolute left-[1px] top-[1px] sm:left-1 sm:top-1 md:left-2 md:top-2"
            id={user?.id}
            onChange={() => toggleChecked(user)}
            checked={user.checked}
          />
          <label
            htmlFor={user?.id}
            className="absolute left-0 top-0 w-full h-full opacity-0 cursor-pointer"
          ></label>
        </motion.li>
      ))}
    </ul>
  );
};

export default UserList;
