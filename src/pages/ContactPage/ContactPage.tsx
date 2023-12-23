import { useState } from 'react';
import { Input } from '@/components/Inputs';
import { IoSearch } from 'react-icons/io5';
import { addAlphaToHexColor } from '@/utils/helpers';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import ContactCollapse from '@/components/Collapse/ContactCollapse';
import EmptyState from '@/components/EmptyState';
import {
  selectFriendByName,
  selectInvitationByName,
} from '@/store/friendsSlice';

const ContactPage = () => {
  const [searchInput, setSearchInput] = useState<string>('');

  const friends = useSelector((state: RootState) =>
    selectFriendByName(state, searchInput)
  );

  const invitations = useSelector((state: RootState) =>
    selectInvitationByName(state, searchInput)
  );

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
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default ContactPage;
