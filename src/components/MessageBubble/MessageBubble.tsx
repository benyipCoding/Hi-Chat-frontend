import clsx from 'clsx';
import Avatar, { defaultAvatar } from '../Avatar/Avatar';
import { formatCommentTime } from '@/utils/helpers';
import { Message } from '@/utils/types';
import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

const avatarStyle: React.CSSProperties = {
  width: '3.5rem',
};

interface MessageBubbleProps {
  // isMe?: boolean;
  createAt: Date;
  showNotice?: boolean;
  content: string;
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  // isMe,
  createAt,
  showNotice = false,
  content,
  message,
}) => {
  const { user } = useContext(AuthContext);

  const isMe = message.sender.id === user?.id;

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
          style={avatarStyle}
          src={message.sender.avatar || defaultAvatar}
        />
        <div
          className={clsx(
            'relative max-w-[58vw] md:max-w-[80vw] lg:max-w-[48vw] xl:max-w-[32vw] rounded-md bg-slate-600 p-2 self-center text-lg overflow-hidden whitespace-normal',
            isMe &&
              'bg-gradient-to-r from-violet-600 to-indigo-600 triangle-me',
            !isMe && 'triangle'
          )}
        >
          {content}
        </div>
      </div>
    </>
  );
};

export default MessageBubble;
