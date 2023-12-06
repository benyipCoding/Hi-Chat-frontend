import MessageBubble from '@/components/MessageBubble/MessageBubble';
import Notice from '@/components/Notice/Notice';
import { RootState } from '@/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const Conversations = () => {
  const { currentConversation } = useSelector(
    (state: RootState) => state.conversation
  );

  useEffect(() => {
    console.log(currentConversation);
  }, []);

  return (
    <>
      <div className="rounded-md bg-[#0000005e] h-[80%] p-2 md:p-4 lg:p-6 overflow-y-auto flex flex-col gap-4 md:gap-6">
        <Notice />
        <MessageBubble />
        <MessageBubble isMe={true} />
      </div>
      <div className="rounded-md bg-[#0000005e] h-[20%] p-2">123123</div>
    </>
  );
};

export default Conversations;
