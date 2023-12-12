import ConversationScreen from '@/components/ConversationRelated/ConversationScreen';
import ToolBar from '@/components/ConversationRelated/ToolBar';
import InputArea from '@/components/ConversationRelated/InputArea';
import EmojiPicker from '@/components/EmojiPicker';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/store';
import {
  fetchMessagesThunk,
  toggleEmojiPickerVisible,
} from '@/store/conversationSlice';
import clsx from 'clsx';
import { useEffect, useState } from 'react';

const Conversations = () => {
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const { messages } = useSelector((state: RootState) => state.conversation);
  const [inputValue, setInputValue] = useState<string>('');

  const { currentConversation } = useSelector(
    (state: RootState) => state.conversation
  );

  const dispatch = useDispatch<AppDispatch>();
  const { isShowEmojiPicker } = useSelector(
    (state: RootState) => state.conversation
  );

  const onClickEmoji = (posX: number, posY: number) => {
    setX(posX);
    setY(posY - 5);
    dispatch(toggleEmojiPickerVisible(!isShowEmojiPicker));
  };

  const onEmojiSelect = (emo: string) => {
    setInputValue((prev) => (prev += emo));
  };

  useEffect(() => {
    if (!currentConversation) return;
    dispatch(fetchMessagesThunk(currentConversation.id));
  }, [currentConversation?.id]);

  return (
    <>
      {currentConversation && (
        <ConversationScreen
          className="rounded-md bg-[#0000005e] h-[75%] lg:h-[70%] p-2 md:p-4 lg:p-6 overflow-y-auto flex flex-col relative gap-4 md:gap-6"
          messages={messages}
        />
      )}
      {currentConversation && (
        <ToolBar
          className="rounded-md bg-[#0000005e] h-[6%] px-6 flex items-center text-2xl gap-6 flex-row-reverse"
          onClickEmoji={onClickEmoji}
        />
      )}
      {currentConversation && (
        <InputArea
          className="rounded-md bg-[#0000005e] flex-1  p-2 flex flex-col gap-3"
          value={inputValue}
          onChange={setInputValue}
        />
      )}
      <EmojiPicker
        className={clsx(
          'absolute opacity-0 pointer-events-none transition scale-0',
          isShowEmojiPicker && 'opacity-100 pointer-events-auto scale-100'
        )}
        style={{ right: `${x}px`, top: `${y}px` }}
        onEmojiSelect={onEmojiSelect}
      />
    </>
  );
};

export default Conversations;
