import { GroupConversation } from '@/utils/types';
import GroupAvatar from '../Avatar/GroupAvatar';
import ConversationDesc from '../Avatar/ConversationDesc';

interface GroupItemProps {
  group: GroupConversation;
  onClick: () => void;
}

const GroupItem: React.FC<GroupItemProps> = ({ group, onClick }) => {
  return (
    <div
      className="flex gap-2 p-2 rounded-md cursor-pointer md:hover:bg-[#0000005e] md:hover:shadow-[#ec923134] md:hover:shadow-md"
      onClick={onClick}
    >
      <GroupAvatar members={group.members} />
      <ConversationDesc
        name={group.name}
        lastMessage={group.lastMessage}
        isGroup={true}
      />
    </div>
  );
};

export default GroupItem;
