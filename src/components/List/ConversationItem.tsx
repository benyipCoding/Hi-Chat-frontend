import { Conversation, Message, User } from '@/utils/types';
import Avatar, { defaultAvatar } from '../Avatar/Avatar';
import { formatCommentTime, formatUserName } from '@/utils/helpers';
import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';
import { Badge } from 'antd';

interface ConversationItemProps {
  user: User;
  lastMessage: Message;
  onClick: (conv: Conversation) => void;
  unReadCount?: number;
  name: string;
}

const ConversationItem: React.FC<ConversationItemProps> = ({
  name,
  user,
  lastMessage,
  onClick,
  unReadCount,
}) => {
  const capitalName = formatUserName(name);
  const { user: currentUser } = useContext(AuthContext);

  return (
    <section
      className="flex gap-2 p-2 rounded-md cursor-pointer md:hover:bg-[#0000005e] md:hover:shadow-[#ec923134] md:hover:shadow-md"
      onClick={onClick as () => void}
    >
      <Badge count={unReadCount} size="default">
        <Avatar src={user?.avatar || defaultAvatar} userName={user?.nickname} />
      </Badge>

      <div className="flex-1 rounded-sm border-b-[1px] flex flex-col border-[#98d3df80] relative text-white ">
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
                : formatUserName(name)
            }: ${lastMessage.content}`}
          </div>
        )}

        {/* Date of message */}
        {lastMessage && (
          <div className="absolute right-0 text-gray-200 top-1">
            {formatCommentTime(lastMessage.createAt!) === 'a few seconds ago'
              ? 'seconds ago'
              : formatCommentTime(lastMessage.createAt!)}
          </div>
        )}
      </div>
    </section>
  );
};

export default ConversationItem;
