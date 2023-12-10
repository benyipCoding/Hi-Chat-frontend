import clsx from 'clsx';
import Avatar from '../Avatar/Avatar';
import { formatCommentTime } from '@/utils/helpers';

const avatarStyle: React.CSSProperties = {
  width: '3.5rem',
};

interface MessageBubbleProps {
  isMe?: boolean;
  createAt: Date;
  showNotice?: boolean;
  content: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  isMe,
  createAt,
  showNotice = false,
  content,
}) => {
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
        <Avatar style={avatarStyle} />
        <div
          className={clsx(
            'relative max-w-[70%] md:max-w-[85%] lg:max-w-[87%] whitespace-pre-wrap rounded-md bg-slate-600 p-2 self-center text-lg',
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
