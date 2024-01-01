import { GroupConversation } from '@/utils/types';
import AvatarDesc from '../Avatar/AvatarDesc';
import GroupAvatar from '../Avatar/GroupAvatar';

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
      <AvatarDesc
        userName={group.name}
        lastMessage={group.lastMessage?.content || ''}
      />
    </div>
  );
};

export default GroupItem;
