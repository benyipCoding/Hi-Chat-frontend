import { Input } from '@/components/Inputs';
import ConversationItem from '@/components/List/ConversationItem';
import { AuthContext } from '@/context/AuthContext';
import { CommonContext } from '@/context/CommonContext';
import { useTranslate } from '@/hooks/useTranslate';
import { AppDispatch, RootState } from '@/store';
import { setCurrentConversation } from '@/store/conversationSlice';
import { setTitle } from '@/store/dynamicPageSlice';
import { postCreateConversation } from '@/utils/api';
import { addAlphaToHexColor, formatUserName } from '@/utils/helpers';
import { Conversation } from '@/utils/types';
import { Empty } from 'antd';
import clsx from 'clsx';
import { useContext, useState } from 'react';
import { IoSearch } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';

const MessagePage = () => {
  const { swipeToDetail } = useTranslate();
  const divList = useContext(CommonContext);
  const dispatch = useDispatch<AppDispatch>();
  const [searchInput, setSearchInput] = useState<string>('');
  const { user } = useContext(AuthContext);

  const { conversations } = useSelector(
    (state: RootState) => state.conversation
  );

  const onClickItem = (conversation: Conversation) => {
    const targetUser =
      conversation.creator?.id === user?.id
        ? conversation.recipient
        : conversation.creator;
    postCreateConversation(targetUser).then((res) => {
      dispatch(setCurrentConversation(res.data));
      dispatch(setTitle(formatUserName(targetUser.name)));
      swipeToDetail(divList!);
    });
  };

  return (
    <div className={clsx('lg:flex-1 flex flex-col gap-2 h-full')}>
      <Input
        background={`${addAlphaToHexColor('#edeff6', 0.9)}`}
        type="text"
        placeholder="search"
        value={searchInput}
        onInput={(e) => setSearchInput((e.target as HTMLInputElement).value)}
        icon={<IoSearch />}
      />

      {conversations.length === 0 ? (
        <div className="m-auto">
          <Empty description={<div className="text-white">No data</div>} />
        </div>
      ) : (
        <div className="p-2 overflow-y-auto flex-1 flex flex-col gap-2">
          {conversations.map((conv) => (
            <ConversationItem
              user={
                conv.creator?.id === user?.id ? conv.recipient : conv.creator
              }
              key={conv?.id}
              lastMessage={conv.lastMessage}
              onClick={() => onClickItem(conv)}
              unReadCount={conv.unReadCount}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagePage;
