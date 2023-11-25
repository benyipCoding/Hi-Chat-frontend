import { AppDispatch, RootState } from '@/store';
import { fetchFriendsThunk } from '@/store/friendsSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input } from '@/components/Inputs';
import EmptyState from '@/components/EmptyState';
import UserItem from '@/components/List/UserItem';
import { IoSearch } from 'react-icons/io5';
import { addAlphaToHexColor } from '@/utils/helpers';

const ContactPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { friends } = useSelector((state: RootState) => state.friends);
  const [searchInput, setSearchInput] = useState<string>('');

  useEffect(() => {
    dispatch(fetchFriendsThunk());
  }, []);

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

      <div className="w-full flex-1 p-2 overflow-y-auto flex flex-col">
        {friends?.length ? (
          friends.map((friend) => <UserItem user={friend} />)
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default ContactPage;
