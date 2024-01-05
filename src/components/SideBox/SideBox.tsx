import { AppDispatch, RootState } from '@/store';
import { BlurGlassDiv } from '@/utils/styles/BlurGlassDiv';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GroupConversation, User } from '@/utils/types';
import Avatar, { defaultAvatar } from '../Avatar/Avatar';
import { motion } from 'framer-motion';
import { IoChatbubbleEllipses } from 'react-icons/io5';
import { FaUserPlus } from 'react-icons/fa';
import { setCurrentPage, setTitle } from '@/store/dynamicPageSlice';
import { DynamicPageName } from '../DynamicPage/pageMap';
import { setCurrentConversation, setIsGroup } from '@/store/conversationSlice';
import { postCreateConversation } from '@/utils/api';
import { formatUserName } from '@/utils/helpers';
import {
  setCustomModalVisible,
  setModalContent,
  setModalInput,
  setTargetMember,
} from '@/store/dropMenuSlice';
import { AuthContext } from '@/context/AuthContext';

const SideBox = () => {
  const { currentConversation, isGroup } = useSelector(
    (state: RootState) => state.conversation
  );
  const { friends } = useSelector((state: RootState) => state.friends);
  const isFriend = (user: User) => {
    return friends.some((f) => f.id === user.id);
  };
  const dispatch = useDispatch<AppDispatch>();
  const { user: currentUser } = useContext(AuthContext);

  const members = (currentConversation as GroupConversation)?.members
    ?.map((user) => {
      const friend = friends.find((f) => f.id === user.id);
      const isMe = user.id === currentUser?.id;
      if (friend) {
        return {
          ...user,
          nickname: friend.nickname,
          isFriend: 1,
        };
      } else if (isMe) {
        return {
          ...user,
          isFriend: 2,
        };
      } else {
        return {
          ...user,
          isFriend: 0,
        };
      }
    })
    .sort((a, b) => b.isFriend - a.isFriend);

  const switchToConversation = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    pageName: DynamicPageName,
    user: User
  ) => {
    e.preventDefault();
    dispatch(setCurrentPage(pageName));
    dispatch(setIsGroup(false));
    postCreateConversation(user)
      .then((res) => {
        dispatch(setCurrentConversation(res.data));
        dispatch(setTitle(formatUserName(user.nickname || user.displayName)));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addNewFriendFromGroup = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    targetUser: User
  ) => {
    e.preventDefault();
    dispatch(setModalContent('add friend'));
    dispatch(setCustomModalVisible(true));
    dispatch(setModalInput(`Hi,I'm ${currentUser?.name}. Nice to meet you!`));
    dispatch(setTargetMember(targetUser));
  };

  useEffect(() => {
    if (!currentConversation || !isGroup) return;
  }, [currentConversation]);

  if (!isGroup || !currentConversation) {
    return (
      <BlurGlassDiv className="w-[25%] rounded-md text-white p-4 text-2xl flex flex-col gap-4">
        GPT Comming Soon...
      </BlurGlassDiv>
    );
  } else {
    return (
      <BlurGlassDiv className="w-[25%] rounded-md text-white p-4 text-xl flex flex-col gap-4">
        <div>Group Members</div>
        <div className="flex-1 overflow-y-auto p-2 gap-3 flex flex-col">
          {members?.map((member) => (
            <div
              className="flex gap-2 p-2 rounded-md cursor-pointer md:hover:bg-[#0000005e] md:hover:shadow-[#ec923134] md:hover:shadow-md"
              key={member.id}
            >
              <Avatar src={member.avatar || defaultAvatar} avatarScale={true} />
              <div className="h-full items-center flex flex-1 border-[#98d3df80] border-b-[1px] justify-between">
                {member.nickname || member.display_name}
                {member.id !== currentUser?.id && (
                  <div className="flex mr-2 gap-2 ">
                    {isFriend(member) ? (
                      <motion.span
                        whileTap={{ scale: 0.9 }}
                        className="border p-2 rounded-full shadow-md shadow-[#ec923188] border-[#ec9131] drop-shadow-sm text-[#ec9131] cursor-pointer"
                        onClick={(e) =>
                          switchToConversation(
                            e,
                            DynamicPageName.CONVERSATION,
                            member
                          )
                        }
                      >
                        <IoChatbubbleEllipses />
                      </motion.span>
                    ) : (
                      <motion.span
                        whileTap={{ scale: 0.9 }}
                        className="border p-2 rounded-full shadow-md shadow-[#3ee47582] border-[#3ee476] drop-shadow-sm text-[#3ee476] cursor-pointer"
                        onClick={(e) => addNewFriendFromGroup(e, member)}
                      >
                        <FaUserPlus />
                      </motion.span>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </BlurGlassDiv>
    );
  }
};

export default SideBox;
