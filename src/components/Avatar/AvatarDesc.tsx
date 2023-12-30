import { AuthContext } from '@/context/AuthContext';
import { formatCommentTime, formatUserName } from '@/utils/helpers';
import { FriendshipStatus, User } from '@/utils/types';
import { Typography } from 'antd';
import clsx from 'clsx';
import React, { useContext, useState } from 'react';
import { StatusMap } from './constant';
import { FaCheck } from 'react-icons/fa6';
import { motion } from 'framer-motion';
import { IoChatbubbleEllipses, IoClose } from 'react-icons/io5';
import {
  postChangeFriendshipStatus,
  postCreateConversation,
} from '@/utils/api';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/store';
import {
  // addFriendListBadge,
  fetchFriendsThunk,
  fetchInvitationsThunk,
} from '@/store/friendsSlice';
import { toast } from 'react-toastify';
import { useTranslate } from '@/hooks/useTranslate';
import { CommonContext } from '@/context/CommonContext';
import { FaUserAlt } from 'react-icons/fa';
import { DynamicPageName } from '../DynamicPage/pageMap';
import { setCurrentPage, setTitle } from '@/store/dynamicPageSlice';
import { setCurrentConversation } from '@/store/conversationSlice';
import { setTargetUser } from '@/store/profileSlice';
import { FaArrowUpRightFromSquare } from 'react-icons/fa6';

interface AvatarDescProps {
  userName: string;
  lastMessage?: string;
  status?: FriendshipStatus;
  updateAt?: Date;
  sender?: User;
  invitationId?: number;
  showDescription?: boolean;
  conversationId?: number;
  isFriendList?: boolean;
  user?: User;
  style?: React.CSSProperties;
  hiddenBorder?: boolean;
}

const AvatarDesc: React.FC<AvatarDescProps> = ({
  userName,
  lastMessage,
  sender,
  status,
  updateAt,
  invitationId,
  showDescription,
  isFriendList,
  user,
  style,
  hiddenBorder = false,
}) => {
  const { Paragraph } = Typography;
  const [ellipsis, setEllipsis] = useState<boolean>(true);
  const { user: self_user } = useContext(AuthContext);
  const CapitalName = formatUserName(userName);
  const dispatch = useDispatch<AppDispatch>();
  const { swipeToDetail } = useTranslate();
  const divList = useContext(CommonContext);

  const swipe = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    pageName: DynamicPageName,
    user: User
  ) => {
    e.stopPropagation();
    dispatch(setCurrentPage(pageName));
    if (pageName === DynamicPageName.CONVERSATION) {
      postCreateConversation(user).then((res) => {
        dispatch(setCurrentConversation(res.data));
        dispatch(setTitle(formatUserName(user.nickname || user.displayName)));
        swipeToDetail(divList!);
      });
    } else {
      dispatch(setTitle(formatUserName(user.nickname || user.displayName)));
      dispatch(setTargetUser(user));
      swipeToDetail(divList!);
    }
  };

  const toggleTextDetail = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    setEllipsis((prev) => !prev);
  };

  const reply = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    invitationId: number,
    status: FriendshipStatus.ACCEPT | FriendshipStatus.REJECT
  ) => {
    e.stopPropagation();
    postChangeFriendshipStatus(invitationId, status).then(() => {
      dispatch(fetchInvitationsThunk());
      toast.success('success');
      if (status === FriendshipStatus.ACCEPT) {
        dispatch(fetchFriendsThunk());
      }
    });
  };

  return (
    <div
      className={clsx(
        'flex-1 rounded-sm flex flex-col border-b-[1px] border-[#98d3df80] relative text-white',
        hiddenBorder && 'border-b-[0px]'
      )}
    >
      {/* User name */}
      <p
        className="flex-1 text-xl flex items-center pl-1 sm:text-2xl lg:text-[20px] drop-shadow-md max-w-[125px] overflow-hidden whitespace-nowrap text-ellipsis"
        style={style}
      >
        {sender?.id === self_user?.id && (
          <FaArrowUpRightFromSquare className="mr-1 mt-1 text-sm text-gray-400" />
        )}
        {CapitalName}
      </p>

      {/* greetings */}
      {showDescription && (
        <Paragraph
          ellipsis={ellipsis ? { rows: 1, suffix: '' } : false}
          className="flex-1 text-md flex items-center text-[white] pl-1 sm:text-lg lg:text-sm w-[60%] sm:w-[70%] lg:w-[55%]"
          onClick={(e) => toggleTextDetail(e)}
        >
          {`${formatUserName(sender?.name)}: ` + lastMessage}
        </Paragraph>
      )}

      {/* date fromNow */}
      <div className="absolute right-0 text-gray-200">
        {formatCommentTime(updateAt!) === 'a few seconds ago'
          ? 'seconds ago'
          : formatCommentTime(updateAt!)}
      </div>

      {/* button sets & invitation status */}
      {invitationId && (
        <div className="absolute right-0 bottom-[15px]">
          {self_user?.id !== sender?.id && status === FriendshipStatus.SENT ? (
            <div className="flex text-3xl">
              <motion.div
                whileTap={{ scale: 0.8 }}
                className="text-green-400 z-2 absolute bottom-[-5px] right-[-5px]"
                onClick={(e) =>
                  reply(e, invitationId!, FriendshipStatus.ACCEPT)
                }
              >
                <FaCheck />
              </motion.div>
              <motion.div
                whileTap={{ scale: 0.8 }}
                className="text-rose-400 z-2 absolute bottom-[-7px] right-12"
                onClick={(e) =>
                  reply(e, invitationId!, FriendshipStatus.REJECT)
                }
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
      )}

      {/* when this component used for friendList. */}
      {isFriendList && (
        <div className="absolute right-0 bottom-[15px] text-md flex gap-4">
          <motion.span
            whileTap={{ scale: 0.9 }}
            className="border p-2 rounded-full shadow-md shadow-[#98d3df76] border-[#98d3df] drop-shadow-sm text-[#98d3df] cursor-pointer"
            onClick={(e) => swipe(e, DynamicPageName.PROFILE, user!)}
          >
            <FaUserAlt />
          </motion.span>
          <motion.span
            whileTap={{ scale: 0.9 }}
            className="border p-2 rounded-full shadow-md shadow-[#ec923188] border-[#ec9131] drop-shadow-sm text-[#ec9131] cursor-pointer"
            onClick={(e) => swipe(e, DynamicPageName.CONVERSATION, user!)}
          >
            <IoChatbubbleEllipses />
          </motion.span>
        </div>
      )}
    </div>
  );
};

export default AvatarDesc;
