import EmptyState from '@/components/EmptyState';
import { Input } from '@/components/Inputs';
import { AppDispatch } from '@/store';
import { setDrawerTitle } from '@/store/drawerSlice';
import { toggle } from '@/store/dropMenuSlice';
import { addAlphaToHexColor } from '@/utils/helpers';
import { DropMenuAction } from '@/utils/types';
import { useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useDispatch } from 'react-redux';

const GroupChat = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();

  const startGroupChat = () => {
    dispatch(toggle(true));
    dispatch(setDrawerTitle(DropMenuAction.CHOOSE));
  };

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

      <div className="w-full flex-1 p-2 flex flex-col gap-2 relative">
        <EmptyState
          label="Choose friends to start a group!"
          btnLabel="Start group chat"
          onClick={startGroupChat}
        />
      </div>
    </div>
  );
};

export default GroupChat;
