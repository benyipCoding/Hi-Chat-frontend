import Avatar from '@/components/Avatar/Avatar';
import AvatarDesc from '@/components/Avatar/AvatarDesc';

const MessagePage = () => {
  // Mock Data
  const arr = [1, 2, 3, 4, 5, 6].map((item) => ({
    src: `/images/avatar/${item}.jpeg`,
    userName: `haha${item}`,
  }));

  return (
    <div className="lg:flex-1 p-2 flex flex-col gap-2">
      {arr.map((item, index) => (
        <section
          className="flex gap-2 p-2 rounded-md cursor-pointer hover:bg-[#0000005e] hover:shadow-[#ec923134] hover:shadow-md"
          key={index}
        >
          <Avatar src={item.src} userName={item.userName} />
          <AvatarDesc userName={item.userName} lastMessage="123456" />
        </section>
      ))}
    </div>
  );
};

export default MessagePage;
