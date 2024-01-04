import { GroupConversation, Message } from '@/utils/types';
import GroupAvatar from '../Avatar/GroupAvatar';
import ConversationDesc from '../Avatar/ConversationDesc';
import { Badge } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

interface GroupItemProps {
  group: GroupConversation;
  onClick: (unReadMessages: Message[]) => void;
  onRightClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

const GroupItem: React.FC<GroupItemProps> = ({
  group,
  onClick,
  onRightClick,
}) => {
  const { unReadGroupMessages } = useSelector(
    (state: RootState) => state.conversation
  );

  const unReadMessages = unReadGroupMessages.filter(
    (msg) => msg.group_conversation_id === group.id
  );

  return (
    <div
      className="flex gap-2 p-2 rounded-md cursor-pointer md:hover:bg-[#0000005e] md:hover:shadow-[#ec923134] md:hover:shadow-md"
      onClick={() => onClick(unReadMessages)}
      onContextMenu={(e) => onRightClick(e)}
    >
      <Badge count={unReadMessages.length} size="default">
        <GroupAvatar members={group.members} />
      </Badge>
      <ConversationDesc
        name={group.name}
        lastMessage={group.lastMessage}
        isGroup={true}
      />
    </div>
  );
};

export default GroupItem;
