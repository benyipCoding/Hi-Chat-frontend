import Avatar from '@/components/Avatar/Avatar';
import AvatarDesc from '@/components/Avatar/AvatarDesc';
import { useTranslate } from '@/hooks/useTranslate';
import { Conversation } from '@/utils/types';

const MessagePage = () => {
  // Mock Data
  const arr: Conversation[] = [1, 2, 3, 4, 5, 6].map((item) => ({
    cover: `/images/avatar/${item}.jpeg`,
    name: `haha${item}`,
    id: item,
  }));
  const { swipeToDetail } = useTranslate();

  const onClickSection = (conversation: Conversation) => {
    const subDivs = document.querySelectorAll<HTMLDivElement>('#root>div>div');

    swipeToDetail(subDivs);
    console.log(conversation);
  };

  return (
    <div className="lg:flex-1 p-2 flex flex-col gap-2">
      {arr.map((item, index) => (
        <section
          className="flex gap-2 p-2 rounded-md cursor-pointer md:hover:bg-[#0000005e] md:hover:shadow-[#ec923134] md:hover:shadow-md"
          key={index}
          onClick={() => onClickSection(item)}
        >
          <Avatar src={item.cover} userName={item.name} />
          <AvatarDesc userName={item.name} lastMessage="123456" />
        </section>
      ))}
    </div>
  );
};

export default MessagePage;
