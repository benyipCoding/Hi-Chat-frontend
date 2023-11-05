import Avatar from '@/components/Avatar/Avatar';
import AvatarDesc from '@/components/Avatar/AvatarDesc';
import { useEffect } from 'react';

const MessagePage = () => {
  // Mock Data
  const arr = [1, 2, 3, 4, 5, 6].map((item) => ({
    src: `/images/avatar/${item}.jpeg`,
    userName: `haha${item}`,
  }));

  useEffect(() => {
    console.log('loaded');

    return () => {
      console.log('before destory');
    };
  }, []);

  return (
    <div className="lg:flex-1 p-2 flex flex-col gap-2">
      {arr.map((item, index) => (
        <section
          className="flex gap-2 p-2 rounded-md cursor-pointer md:hover:bg-[#0000005e] md:hover:shadow-[#ec923134] md:hover:shadow-md"
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
