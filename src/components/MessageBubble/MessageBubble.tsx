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
}

const MessageBubble: React.FC<MessageBubbleProps> = ({
  isMe,
  createAt,
  showNotice = false,
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
            'relative max-w-[70%] md:max-w-[85%] lg:max-w-[87%] whitespace-pre-wrap rounded-md bg-slate-600 p-3 self-center',
            isMe &&
              'bg-gradient-to-r from-violet-600 to-indigo-600 triangle-me',
            !isMe && 'triangle'
          )}
        >
          在Tailwind
          CSS中，你可以使用overflow-和whitespace-类来控制文本溢出和换行的样式。以下是一些示例：这只是一些基本的示例，你可以根据具体的需求结合使用这些类。Tailwind
          CSS提供了丰富的类来定制文本的样式和布局，详细的文档可以在官方网站上找到：Tailwind
          CSS 文档。
        </div>
      </div>
    </>
  );
};

export default MessageBubble;
