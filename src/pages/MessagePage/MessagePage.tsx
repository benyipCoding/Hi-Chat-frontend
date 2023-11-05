import Avatar from '@/components/Avatar/Avatar';

const MessagePage = () => {
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
          <div className="flex-1 rounded-sm flex flex-col border-b-[1px] border-[#98d3df80]">
            <p className="flex-1 text-xl flex items-center pl-1 sm:text-2xl">
              {item.userName}
            </p>
            <p className="flex-1 text-sm flex items-center text-[#b5bac1] pl-1 sm:text-lg">
              1231231231231
            </p>
          </div>
        </section>
      ))}
    </div>
  );
};

export default MessagePage;
