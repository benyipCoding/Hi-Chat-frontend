import { useState } from 'react';
import { Input } from '@/components/Inputs';
import { IoSearch } from 'react-icons/io5';
import { addAlphaToHexColor } from '@/utils/helpers';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import ContactCollapse from '@/components/Collapse/ContactCollapse';
import EmptyState from '@/components/EmptyState';

const ContactPage = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const { invitations, friends } = useSelector(
    (state: RootState) => state.friends
  );

  return (
    <div className="h-full flex flex-col">
      <Input
        background={`${addAlphaToHexColor('#edeff6', 0.9)}`}
        type="text"
        placeholder="search"
        value={searchInput}
        onInput={(e) => setSearchInput((e.target as HTMLInputElement).value)}
        icon={<IoSearch />}
      />

      <div className="w-full flex-1 p-2 overflow-y-auto flex flex-col gap-2 relative">
        {invitations.length ? (
          <ContactCollapse invitations={invitations} friendList={friends} />
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default ContactPage;
