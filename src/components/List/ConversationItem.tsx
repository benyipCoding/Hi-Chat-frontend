import { Conversation, Message, User } from '@/utils/types';
import Avatar, { defaultAvatar } from '../Avatar/Avatar';
import { Badge } from 'antd';
import ConversationDesc from '../Avatar/ConversationDesc';

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
  return (
    <section
      className="flex gap-2 p-2 rounded-md cursor-pointer md:hover:bg-[#0000005e] md:hover:shadow-[#ec923134] md:hover:shadow-md"
      onClick={onClick as () => void}
    >
      <Badge count={unReadCount} size="default">
        <Avatar
          src={user?.avatar || defaultAvatar}
          userName={user?.nickname || user.displayName}
        />
      </Badge>
      <ConversationDesc name={name} lastMessage={lastMessage} />
    </section>
  );
};

export default ConversationItem;
