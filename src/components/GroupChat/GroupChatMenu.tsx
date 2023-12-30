import { useState } from 'react';
import SearchInput from '../Inputs/SearchInput';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import {
  clearGroupSelected,
  groupAllOrNone,
  selectFriendByName,
  setFriendGroupSelected,
} from '@/store/friendsSlice';
import ChooseFriendsItem from '../List/ChooseFriendsItem';
import { User } from '@/utils/types';
import DrawerConfirmBtn from '../Buttons/DrawerConfirmBtn';
import { postCreateGroupConversation } from '@/utils/api';
import { dropRepeat } from '@/utils/helpers';
import { toggleVisible } from '@/store/drawerSlice';
import { toast } from 'react-toastify';

const GroupChatMenu = () => {
  const [inputVal, setInputVal] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const friends = useSelector((state: RootState) =>
    selectFriendByName(state, inputVal)
  );

  const selectAllOrNone = () => {
    dispatch(groupAllOrNone());
  };

  const onClickItem = (
    e: React.ChangeEvent<HTMLInputElement>,
    targetUser: User
  ) => {
    dispatch(
      setFriendGroupSelected({ targetUser, groupSelected: e.target.checked })
    );
  };

  const isShowBtn = friends.some((f) => f.groupSelected);

  const createGroupChat = () => {
    const friendsIds = dropRepeat(
      friends.filter((f) => f.groupSelected).map((f) => f.id)
    );
    postCreateGroupConversation({ members: friendsIds })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.data);
      })
      .finally(() => {
        dispatch(toggleVisible(false));
        dispatch(clearGroupSelected());
      });
  };

  return (
    <div className="h-full flex flex-col gap-3 relative">
      {/* search input */}
      <SearchInput
        inputVal={inputVal}
        setInputVal={setInputVal}
        onClickIcon={selectAllOrNone}
      />
      {/* list */}
      <div className="flex-1 overflow-y-auto flex flex-col scroll-bar rounded-md p-2 gap-2">
        {friends.map((friend) => (
          <ChooseFriendsItem
            user={friend}
            key={friend.id}
            onClick={(e) => onClickItem(e, friend)}
          />
        ))}
      </div>
      {/* confirm btn */}
      {isShowBtn && (
        <DrawerConfirmBtn label="Create new group" onClick={createGroupChat} />
      )}
    </div>
  );
};

export default GroupChatMenu;
