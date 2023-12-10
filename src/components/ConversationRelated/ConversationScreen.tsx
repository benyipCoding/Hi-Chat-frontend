import { useDispatch, useSelector } from 'react-redux';
import MessageBubble from '../MessageBubble/MessageBubble';
import { AppDispatch, RootState } from '@/store';
import { toggleEmojiPickerVisible } from '@/store/conversationSlice';
import { useContext } from 'react';
import { Message } from '@/utils/types';
import { AuthContext } from '@/context/AuthContext';

interface ConversationScreenProps {
  className: string;
  messages: Message[];
}

const ConversationScreen: React.FC<ConversationScreenProps> = ({
  className,
  messages,
}) => {
  const { isShowEmojiPicker } = useSelector(
    (state: RootState) => state.conversation
  );
  const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();

  const onClickScreen = () => {
    if (isShowEmojiPicker) dispatch(toggleEmojiPickerVisible(false));
  };

  return (
    <div className={className} onClick={onClickScreen}>
      {messages.map((msg, index) => (
        <MessageBubble
          createAt={msg.createAt}
          showNotice={false}
          isMe={user?.id === msg.sender.id}
          content={msg.content}
          key={index}
        />
      ))}
    </div>
  );
};

export default ConversationScreen;
