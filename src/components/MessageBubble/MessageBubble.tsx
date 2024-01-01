import clsx from 'clsx';
import Avatar, { defaultAvatar } from '../Avatar/Avatar';
import { formatCommentTime } from '@/utils/helpers';
import { Message } from '@/utils/types';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

// const avatarStyle: React.CSSProperties = {
//   width: '3.5rem',
// };

interface MessageBubbleProps {
  createAt: Date;
  showNotice?: boolean;
  content: string;
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  createAt,
  showNotice = false,
  content,
  message,
}) => {
  const { user } = useContext(AuthContext);
  const { friends } = useSelector((state: RootState) => state.friends);

  const isMe = message.sender.id === user?.id;
  const senderNickname = isMe
    ? undefined
    : friends.find((f) => f.id === message.sender.id)?.nickname;

  return (
    <>
      {/* notice */}
      {showNotice && (
        <div className="flex justify-center text-gray-300">
          {formatCommentTime(createAt)}
        </div>
      )}
      {/* content */}
      <div
        className={clsx('flex gap-3 items-start', isMe && 'flex-row-reverse')}
      >
        <Avatar
          // style={avatarStyle}
          src={message.sender.avatar || defaultAvatar}
          avatarScale={true}
        />

        <div
          className={clsx(
            'relative max-w-[58vw] md:max-w-[80vw] lg:max-w-[48vw] xl:max-w-[32vw] rounded-md bg-slate-600 p-2 self-center text-lg  whitespace-normal',
            isMe &&
              'bg-gradient-to-r from-violet-600 to-indigo-600 triangle-me',
            !isMe && 'triangle top-3'
          )}
        >
          {!isMe && (
            <p className="absolute top-[-20px] left-0 text-sm text-gray-300 w-20">
              {senderNickname || message.sender.displayName}
            </p>
          )}
          {content}
        </div>
      </div>
    </>
  );
};

export default MessageBubble;
