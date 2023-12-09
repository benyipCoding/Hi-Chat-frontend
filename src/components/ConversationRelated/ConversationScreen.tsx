import { useDispatch, useSelector } from 'react-redux';
import MessageBubble from '../MessageBubble/MessageBubble';
import dayjs from 'dayjs';
import { AppDispatch, RootState } from '@/store';
import { toggleEmojiPickerVisible } from '@/store/conversationSlice';

interface ConversationScreenProps {
  className: string;
}

const ConversationScreen: React.FC<ConversationScreenProps> = ({
  className,
}) => {
  const { isShowEmojiPicker } = useSelector(
    (state: RootState) => state.conversation
  );
  const dispatch = useDispatch<AppDispatch>();

  const onClickScreen = () => {
    if (isShowEmojiPicker) dispatch(toggleEmojiPickerVisible(false));
  };

  return (
    <div className={className} onClick={onClickScreen}>
      <MessageBubble
        createAt={dayjs().subtract(1, 'days').toDate()}
        showNotice={true}
      />
      <MessageBubble
        createAt={dayjs().subtract(2, 'hours').toDate()}
        isMe={true}
      />
      <MessageBubble
        createAt={dayjs().subtract(2, 'hours').toDate()}
        isMe={true}
      />
    </div>
  );
};

export default ConversationScreen;
