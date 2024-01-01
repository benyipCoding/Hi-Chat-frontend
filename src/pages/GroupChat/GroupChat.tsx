import { DynamicPageName } from '@/components/DynamicPage/pageMap';
import EmptyState from '@/components/EmptyState';
import { Input } from '@/components/Inputs';
import GroupItem from '@/components/List/GroupItem';
import { CommonContext } from '@/context/CommonContext';
import { useTranslate } from '@/hooks/useTranslate';
import { AppDispatch, RootState } from '@/store';
import {
  fetchGroupMessagesThunk,
  setCurrentConversation,
  setIsGroup,
} from '@/store/conversationSlice';
import { setDrawerTitle, toggleVisible } from '@/store/drawerSlice';
import { setCurrentPage, setTitle } from '@/store/dynamicPageSlice';
import { clearGroupSelected } from '@/store/friendsSlice';
import { addAlphaToHexColor } from '@/utils/helpers';
import { DropMenuAction, GroupConversation } from '@/utils/types';
import { useContext, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';

const GroupChat = () => {
  const [searchInput, setSearchInput] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const { groupConvList } = useSelector(
    (state: RootState) => state.groupConversation
  );
  const { currentConversation } = useSelector(
    (state: RootState) => state.conversation
  );
  const { swipeToDetail } = useTranslate();
  const divList = useContext(CommonContext);

  const startGroupChat = () => {
    dispatch(toggleVisible(true));
    dispatch(setDrawerTitle(DropMenuAction.CHOOSE));
    dispatch(clearGroupSelected());
  };

  const showEmptyState = groupConvList.length === 0;

  const clickGroupItem = (group: GroupConversation) => {
    dispatch(setIsGroup(true));
    dispatch(setTitle(group.name));
    dispatch(setCurrentConversation(group));
    dispatch(setCurrentPage(DynamicPageName.CONVERSATION));
    swipeToDetail(divList!);

    if (
      currentConversation?.id === group.id &&
      currentConversation.name === group.name
    )
      return;
    dispatch(fetchGroupMessagesThunk(group.id));
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

      <div className="w-full flex-1 p-2 flex flex-col gap-2 relative overflow-y-auto">
        {groupConvList.map((group) => (
          <GroupItem
            group={group}
            key={group.id}
            onClick={() => clickGroupItem(group)}
          />
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
