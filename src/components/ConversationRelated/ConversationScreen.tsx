import { useDispatch, useSelector } from 'react-redux';
import MessageBubble from '../MessageBubble/MessageBubble';
import { AppDispatch, RootState } from '@/store';
import { toggleEmojiPickerVisible } from '@/store/conversationSlice';
import { useEffect, useRef, useState } from 'react';
import { Message } from '@/utils/types';
// import { AuthContext } from '@/context/AuthContext';

interface ConversationScreenProps {
  className: string;
  messages: Message[];
}

const options = {
  root: null, // 使用默认的视窗作为根
  rootMargin: '0px', // 视窗的margin
  threshold: 0.5, // 交叉比例，这里是50%可见时触发
};

const ConversationScreen: React.FC<ConversationScreenProps> = ({
  className,
  messages,
}) => {
  const { isShowEmojiPicker } = useSelector(
    (state: RootState) => state.conversation
  );
  // const { user } = useContext(AuthContext);
  const dispatch = useDispatch<AppDispatch>();
  const screen = useRef<HTMLDivElement>(null);
  const bottom = useRef<HTMLDivElement>(null);
  const [isBottom, setIsBottom] = useState<boolean>(true);
  const [isInit, setIsInit] = useState<boolean>(true);

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsBottom(true);
      } else {
        setIsBottom(false);
      }
    });
  }, options);

  const onClickScreen = () => {
    if (isShowEmojiPicker) dispatch(toggleEmojiPickerVisible(false));
  };

  const scrollToBottom = (behavior: ScrollBehavior) => {
    setTimeout(() => {
      screen.current!.scrollTo({
        behavior,
        top: screen.current?.scrollHeight,
      });
    });
  };

  useEffect(() => {
    if (!screen.current || !isBottom || isInit) return;
    scrollToBottom('instant');
  }, [messages.length]);

  useEffect(() => {
    setTimeout(() => {
      scrollToBottom('instant');
      observer.observe(bottom.current!);
      setIsInit(false);
    }, 50);
  }, []);

  return (
    <div className={className} onClick={onClickScreen} ref={screen}>
      {messages.map((msg, index) => (
        <MessageBubble
          createAt={msg.createAt}
          showNotice={false}
          // isMe={user?.id === msg.sender.id}
          content={msg.content}
          key={index}
          message={msg}
        />
      ))}
      <div
        ref={bottom}
        className="text-xs opacity-0 mt-[-12px] pointer-events-none"
      >
        1
      </div>
    </div>
  );
};

export default ConversationScreen;
