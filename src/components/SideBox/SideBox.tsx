import { RootState } from '@/store';
import { BlurGlassDiv } from '@/utils/styles/BlurGlassDiv';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { GroupConversation } from '@/utils/types';
import Avatar, { defaultAvatar } from '../Avatar/Avatar';

const SideBox = () => {
  const { currentConversation, isGroup } = useSelector(
    (state: RootState) => state.conversation
  );

  const { friends } = useSelector((state: RootState) => state.friends);

  const members = (currentConversation as GroupConversation)?.members?.map(
    (user) => {
      const friend = friends.find((f) => f.id === user.id);
      if (friend) {
        return {
          ...user,
          nickname: friend.nickname,
        };
      }
      return {
        ...user,
      };
    }
  );

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
          {members.map((member) => (
            <div
              className="flex gap-2 p-2 rounded-md cursor-pointer md:hover:bg-[#0000005e] md:hover:shadow-[#ec923134] md:hover:shadow-md"
              key={member.id}
            >
              <Avatar src={member.avatar || defaultAvatar} avatarScale={true} />
              <div className="h-full items-center flex flex-1 border-[#98d3df80] border-b-[1px]">
                {member.nickname || member.display_name}
              </div>
            </div>
          ))}
        </div>
      </BlurGlassDiv>
    );
  }
};

export default SideBox;
