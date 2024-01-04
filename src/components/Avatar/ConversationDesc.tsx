/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthContext } from '@/context/AuthContext';
import { RootState } from '@/store';
import { formatCommentTime, formatUserName } from '@/utils/helpers';
import { Message } from '@/utils/types';
import { useContext } from 'react';
import { useSelector } from 'react-redux';

interface ConversationDescProps {
  name: string;
  lastMessage: Message;
  isGroup?: boolean;
}

const ConversationDesc: React.FC<ConversationDescProps> = ({
  name,
  lastMessage,
  isGroup = false,
}) => {
  const { user: currentUser } = useContext(AuthContext);
  const capitalName = formatUserName(name);
  const { friends } = useSelector((state: RootState) => state.friends);

  let nickname: string | undefined;
  if (isGroup && lastMessage?.sender_id !== currentUser?.id) {
    const targetUser = friends.find((f) => f.id === lastMessage?.sender_id);
    nickname = targetUser ? targetUser.nickname : undefined;
  }

  return (
    <div className="flex-1 rounded-sm border-b-[1px] flex flex-col border-[#98d3df80] relative text-white">
      {/* User name */}
      <p className="flex-1 text-lg flex items-center pl-1 sm:text-xl lg:text-[18px] drop-shadow-md w-[160px] overflow-hidden whitespace-nowrap overflow-ellipsis sm:w-full lg:w-[120px] xl:w-[150px] font-sans">
        {capitalName}
      </p>

      {/* Last message */}
      {lastMessage && (
        <div className="pl-1 overflow-hidden whitespace-nowrap overflow-ellipsis w-[65vw] text-[#cacaca] text-sm max-w-[235px] h-6 flex items-center">
          {`${
            lastMessage.senderName === currentUser?.name
              ? 'me'
              : formatUserName(
                  isGroup ? nickname || lastMessage.sender_name : name
                )
          }: ${lastMessage.content}`}
        </div>
      )}

      {/* Date of message */}
      {lastMessage && (
        <div className="absolute right-0 text-gray-200 top-1">
          {formatCommentTime(lastMessage.createAt || lastMessage.create_at) ===
          'a few seconds ago'
            ? 'seconds ago'
            : formatCommentTime(lastMessage.createAt || lastMessage.create_at)}
        </div>
      )}
    </div>
  );
};

export default ConversationDesc;
