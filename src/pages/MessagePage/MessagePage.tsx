import { DynamicPageName } from '@/components/DynamicPage/pageMap';
import { Input } from '@/components/Inputs';
import ConversationItem from '@/components/List/ConversationItem';
import { AuthContext } from '@/context/AuthContext';
import { CommonContext } from '@/context/CommonContext';
import { useTranslate } from '@/hooks/useTranslate';
import { AppDispatch, RootState } from '@/store';
import {
  selectConversationsByConvName,
  setCurrentConversation,
  setIsGroup,
} from '@/store/conversationSlice';
import { setCurrentPage, setTitle } from '@/store/dynamicPageSlice';
import {
  getConversationList,
  postCreateConversation,
  updateMessageStatusByConversationId,
} from '@/utils/api';
import { addAlphaToHexColor, formatUserName } from '@/utils/helpers';
import { Conversation, User } from '@/utils/types';
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
  const conversations = useSelector((state: RootState) =>
    selectConversationsByConvName(state, searchInput)
  );

  const onClickItem = (conversation: Conversation, targetUser: User) => {
    dispatch(setIsGroup(false));
    postCreateConversation(targetUser)
      .then((res) => {
        dispatch(setCurrentConversation(res.data));
        dispatch(setTitle(formatUserName(conversation.name)));
        dispatch(setCurrentPage(DynamicPageName.CONVERSATION));
        updateMessageStatusByConversationId(conversation.id).then(() => {
          getConversationList();
        });
        swipeToDetail(divList!);
      })
      .catch((err) => {
        console.log(err);
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
        <div className="p-2 flex-1 flex flex-col gap-2 overflow-y-auto max-h-[82%]">
          {conversations.map((conv) => {
            const targetUser =
              conv.creator?.id === user?.id ? conv.recipient : conv.creator;

            return (
              <ConversationItem
                name={conv.name!}
                user={targetUser!}
                key={conv?.id}
                lastMessage={conv.lastMessage}
                onClick={() => onClickItem(conv, targetUser)}
                unReadCount={conv.unReadCount}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MessagePage;
