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
            'relative max-w-[62vw] md:max-w-[80vw] lg:max-w-[56vw] rounded-md bg-slate-600 p-2 self-center text-lg overflow-hidden whitespace-normal',
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
