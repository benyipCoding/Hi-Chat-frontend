import AvatarDesc from '@/components/Avatar/AvatarDesc';
import GroupAvatar from '@/components/Avatar/GroupAvatar';
import EmptyState from '@/components/EmptyState';
import { Input } from '@/components/Inputs';
import { AppDispatch, RootState } from '@/store';
import { setDrawerTitle, toggleVisible } from '@/store/drawerSlice';
import { clearGroupSelected } from '@/store/friendsSlice';
import { addAlphaToHexColor } from '@/utils/helpers';
import { DropMenuAction } from '@/utils/types';
import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';

const GroupChat = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const { groupConvList } = useSelector(
    (state: RootState) => state.groupConversation
  );

  const startGroupChat = () => {
    dispatch(toggleVisible(true));
    dispatch(setDrawerTitle(DropMenuAction.CHOOSE));
    dispatch(clearGroupSelected());
  };

  const showEmptyState = groupConvList.length === 0;

  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <Input
        background={`${addAlphaToHexColor('#edeff6', 0.9)}`}
        type="text"
        placeholder="search"
        value={searchInput}
        onInput={(e) => setSearchInput((e.target as HTMLInputElement).value)}
        icon={<IoSearch />}
      />

      <div className="w-full flex-1 p-2 flex flex-col gap-2 relative overflow-y-auto">
        {groupConvList.map((group) => (
          <div
            key={group.id}
            className="flex gap-2 p-2 rounded-md cursor-pointer md:hover:bg-[#0000005e] md:hover:shadow-[#ec923134] md:hover:shadow-md"
          >
            <GroupAvatar members={group.members} />
            <AvatarDesc
              userName={group.name}
              lastMessage={group.lastMessage?.content || ''}
            />
          </div>
        ))}

        {showEmptyState && (
          <EmptyState
            label="Choose friends to start a group!"
            btnLabel="Start group chat"
            onClick={startGroupChat}
          />
        )}
      </div>
    </div>
  );
};

export default GroupChat;
