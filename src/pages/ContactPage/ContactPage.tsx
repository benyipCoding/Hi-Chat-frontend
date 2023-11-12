import Avatar from '@/components/Avatar/Avatar';
import AvatarDesc from '@/components/Avatar/AvatarDesc';
import { AppDispatch, RootState } from '@/store';
import { fetchFriendsThunk } from '@/store/friendsSlice';
import { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Empty } from 'antd';
import { useTranslate } from '@/hooks/useTranslate';
import { User } from '@/utils/types';
import { CommonContext } from '@/context/CommonContext';

const ContactPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { friends } = useSelector((state: RootState) => state.friends);
  const { swipeToDetail } = useTranslate();
  const divs = useContext(CommonContext);

  const swipeToFriendsProfile = (friend: User) => {
    console.log(friend);
    swipeToDetail(divs!);
  };

  useEffect(() => {
    dispatch(fetchFriendsThunk());
  }, []);

  return (
    <div className="w-full h-full p-2 overflow-y-auto">
      {friends?.length &&
        friends.map((friend) => (
          <section
            className="flex gap-2 p-2 rounded-md cursor-pointer md:hover:bg-[#0000005e] md:hover:shadow-[#ec923134] md:hover:shadow-md"
            key={friend?.email}
            onClick={() => swipeToFriendsProfile(friend)}
          >
            <Avatar
              src={friend?.avatar || `/images/avatar/1.jpeg`}
              userName={friend?.name}
            />
            <AvatarDesc
              userName={friend?.name || ''}
              lastMessage="123456"
              showLastMessage={false}
            />
          </section>
        ))}
      {!friends && (
        <Empty
          image={
            <img
              src="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              className="object-cover w-full"
            />
          }
          description={
            <span className="text-white text-lg">
              Add friends to start chatting!
            </span>
          }
          className="h-full flex flex-col justify-center items-center"
        >
          <Button className="bg-gradient-to-r from-violet-600 to-indigo-600">
            <span className="text-white">Start chat now</span>
          </Button>
        </Empty>
      )}
    </div>
  );
};

export default ContactPage;
