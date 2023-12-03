import Avatar from '@/components/Avatar/Avatar';
import { RootState } from '@/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const avatarStyle: React.CSSProperties = {
  width: '3.5rem',
};

const Conversations = () => {
  const { currentConversation } = useSelector(
    (state: RootState) => state.conversation
  );

  useEffect(() => {
    console.log(currentConversation);
  }, []);

  return (
    <>
      <div className="rounded-md bg-[#0000005e] h-[80%] p-2 md:p-4 lg:p-6 overflow-y-auto flex flex-col gap-4">
        <div className="flex gap-3 items-start ">
          <Avatar style={avatarStyle} />
          <div className="max-w-[75%] overflow-hidden whitespace-pre-wrap rounded-md bg-slate-600 p-3 self-center">
            在Tailwind
            CSS中，你可以使用overflow-和whitespace-类来控制文本溢出和换行的样式。以下是一些示例：这只是一些基本的示例，你可以根据具体的需求结合使用这些类。Tailwind
            CSS提供了丰富的类来定制文本的样式和布局，详细的文档可以在官方网站上找到：Tailwind
            CSS 文档。
          </div>
        </div>
        <div className="flex gap-3 items-start flex-row-reverse">
          <Avatar style={avatarStyle} />
          <div className="max-w-[75%] rounded-md bg-gradient-to-r from-violet-600 to-indigo-600 p-3 self-center">
            Scalable Knowledge Bases: Build knowledge bases that can scale with
            user growth and data
            volumeCSS中，你可以使用overflow-和whitespace-类来控制文本溢出和换行的样式。以下是一些示例：这只是一些基本的示例，你可以根据具体的需求结合使用这些类。Tailwind
            CSS提供了丰富的类来定制文本的样式和布局，详细的文档可以在官方网站上找到：Tailwind
            CSS 文档。
          </div>
        </div>
      </div>
      <div className="rounded-md bg-[#0000005e] h-[20%] p-2">123123</div>
    </>
  );
};

export default Conversations;
