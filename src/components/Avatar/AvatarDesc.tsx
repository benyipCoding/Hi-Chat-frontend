import { AuthContext } from '@/context/AuthContext';
import { formatCommentTime, formatUserName } from '@/utils/helpers';
import { FriendshipStatus, User } from '@/utils/types';
import { Typography } from 'antd';
import clsx from 'clsx';
import React, { useContext, useState } from 'react';
import { StatusMap } from './constant';
import { FaCheck } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { IoClose } from 'react-icons/io5';
import { postChangeFriendshipStatus } from '@/utils/api';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import { fetchFriendsThunk, fetchInvitationsThunk } from '@/store/friendsSlice';
import { toast } from 'react-toastify';

interface AvatarDescProps {
  userName: string;
  lastMessage: string;
  status?: FriendshipStatus;
  updateAt?: Date;
  sender?: User;
  invitationId?: number;
}

const AvatarDesc: React.FC<AvatarDescProps> = ({
  userName,
  lastMessage,
  sender,
  status,
  updateAt,
  invitationId,
}) => {
  const { Paragraph } = Typography;
  const [ellipsis, setEllipsis] = useState<boolean>(true);
  const { user } = useContext(AuthContext);
  const CapitalName = formatUserName(userName);
  const dispatch = useDispatch<AppDispatch>();

  const toggleTextDetail = () => {
    setEllipsis((prev) => !prev);
  };

  const reply = (
    invitationId: number,
    status: FriendshipStatus.ACCEPT | FriendshipStatus.REJECT
  ) => {
    postChangeFriendshipStatus(invitationId, status).then((res) => {
      console.log(res);
      dispatch(fetchInvitationsThunk());
      toast.success('success');
      if (status === FriendshipStatus.ACCEPT) dispatch(fetchFriendsThunk());
    });
  };

  return (
    <div className="flex-1 rounded-sm flex flex-col border-b-[1px] border-[#98d3df80] relative text-white">
      {/* User name */}
      <p className="flex-1 text-2xl flex items-center pl-1 sm:text-2xl lg:text-[20px] drop-shadow-md">
        {`${sender?.id === user?.id ? 'to ' : ''}` + CapitalName}
      </p>

      {/* greetings */}
      <Paragraph
        ellipsis={ellipsis ? { rows: 1, suffix: '' } : false}
        className="flex-1 text-md flex items-center text-[white] pl-1 sm:text-lg lg:text-sm w-[60%] sm:w-[70%] lg:w-[55%]"
        onClick={toggleTextDetail}
      >
        {`${formatUserName(sender?.name)}: ` + lastMessage}
      </Paragraph>

      {/* date fromNow */}
      <div className="absolute right-0 text-gray-200">
        {formatCommentTime(updateAt!) === 'a few seconds ago'
          ? 'seconds ago'
          : formatCommentTime(updateAt!)}
      </div>

      {/* button sets & invitation status */}
      <div className="absolute right-0 bottom-[15px]">
        {user?.id !== sender?.id && status === FriendshipStatus.SENT ? (
          <div className="flex text-3xl">
            <motion.div
              whileTap={{ scale: 0.8 }}
              className="text-green-400 z-2 absolute bottom-[-5px] right-[-5px]"
              onClick={() => reply(invitationId!, FriendshipStatus.ACCEPT)}
            >
              <FaCheck />
            </motion.div>
            <motion.div
              whileTap={{ scale: 0.8 }}
              className="text-rose-400 z-2 absolute bottom-[-7px] right-12"
              onClick={() => reply(invitationId!, FriendshipStatus.REJECT)}
            >
              <IoClose />
            </motion.div>
          </div>
        ) : (
          <div
            className={clsx(
              'text-lg flex items-center font-semibold',
              StatusMap.get(status!)
            )}
          >
            {formatUserName(status)}
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarDesc;
