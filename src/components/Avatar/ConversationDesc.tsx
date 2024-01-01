/* eslint-disable @typescript-eslint/no-explicit-any */
import { AuthContext } from '@/context/AuthContext';
import { formatCommentTime, formatUserName } from '@/utils/helpers';
import { Message } from '@/utils/types';
import { useContext } from 'react';

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

  return (
    <div className="flex-1 rounded-sm border-b-[1px] flex flex-col border-[#98d3df80] relative text-white">
      {/* User name */}
      <p className="flex-1 text-xl flex items-center pl-1 sm:text-2xl lg:text-[20px] drop-shadow-md w-[160px] overflow-hidden whitespace-nowrap overflow-ellipsis sm:w-full lg:w-[120px] xl:w-[150px]">
        {capitalName}
      </p>

      {/* Last message */}
      {lastMessage && (
        <div className="pl-1 overflow-hidden whitespace-nowrap overflow-ellipsis w-[65vw] text-[#cacaca] text-sm max-w-[235px] h-6 flex items-center">
          {`${
            lastMessage.senderName === currentUser?.name
              ? 'me'
              : formatUserName(
                  isGroup
                    ? lastMessage.senderName || lastMessage.sender_name
                    : name
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
