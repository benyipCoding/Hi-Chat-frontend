import { useState } from 'react';
import { Input } from '@/components/Inputs';
import { IoSearch } from 'react-icons/io5';
import { addAlphaToHexColor } from '@/utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import ContactCollapse from '@/components/Collapse/ContactCollapse';
import EmptyState from '@/components/EmptyState';
import {
  selectFriendByName,
  selectInvitationByName,
} from '@/store/friendsSlice';
import { DropMenuAction } from '@/utils/types';
import { setDrawerTitle, toggleVisible } from '@/store/drawerSlice';

const ContactPage = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();

  const friends = useSelector((state: RootState) =>
    selectFriendByName(state, searchInput)
  );

  const invitations = useSelector((state: RootState) =>
    selectInvitationByName(state, searchInput)
  );

  const showAddFriends = () => {
    dispatch(toggleVisible(true));
    dispatch(setDrawerTitle(DropMenuAction.ADD_FRIENDS));
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
        {invitations.length || friends.length ? (
          <ContactCollapse invitations={invitations} friendList={friends} />
        ) : (
          <EmptyState
            label="Add friends to start chatting!"
            onClick={showAddFriends}
            btnLabel="Start chat now"
          />
        )}
      </div>
    </div>
  );
};

export default ContactPage;
