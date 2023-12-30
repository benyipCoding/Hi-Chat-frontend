import { useState } from 'react';
import SearchInput from '../Inputs/SearchInput';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import {
  selectFriendByName,
  setFriendGroupSelected,
} from '@/store/friendsSlice';
import ChooseFriendsItem from '../List/ChooseFriendsItem';
import { User } from '@/utils/types';

const GroupChatMenu = () => {
  const [inputVal, setInputVal] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const friends = useSelector((state: RootState) =>
    selectFriendByName(state, inputVal)
  );

  const selectAllOrNone = () => {};

  const onClickItem = (
    e: React.ChangeEvent<HTMLInputElement>,
    targetUser: User
  ) => {
    dispatch(
      setFriendGroupSelected({ targetUser, groupSelected: e.target.checked })
    );
  };

  return (
    <div className="h-full flex flex-col gap-3">
      <SearchInput
        inputVal={inputVal}
        setInputVal={setInputVal}
        onClickIcon={selectAllOrNone}
      />
      <div className="flex-1 overflow-y-auto flex flex-col scroll-bar rounded-md p-2 gap-2">
        {friends.map((friend) => (
          <ChooseFriendsItem
            user={friend}
            key={friend.id}
            onClick={(e) => onClickItem(e, friend)}
          />
        ))}
      </div>
    </div>
  );
};

export default GroupChatMenu;
