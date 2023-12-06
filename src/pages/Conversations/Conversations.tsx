import MessageBubble from '@/components/MessageBubble/MessageBubble';
import { RootState } from '@/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

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
        <MessageBubble createAt={dayjs().subtract(1, 'days').toDate()} />
        <MessageBubble
          createAt={dayjs().subtract(2, 'hours').toDate()}
          isMe={true}
        />
      </div>
      <div className="rounded-md bg-[#0000005e] h-[20%] p-2">123123</div>
    </>
  );
};

export default Conversations;
