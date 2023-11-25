import { AppDispatch } from '@/store';
import { toggleVisible } from '@/store/drawerSlice';
import { Button, Empty } from 'antd';
import { useDispatch } from 'react-redux';

const EmptyState = () => {
  const dispatch = useDispatch<AppDispatch>();

  return (
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
      className="flex-1 flex flex-col justify-center items-center"
    >
      <Button
        className="bg-gradient-to-r from-violet-600 to-indigo-600"
        onClick={() => dispatch(toggleVisible(true))}
      >
        <span className="text-white">Start chat now</span>
      </Button>
    </Empty>
  );
};

export default EmptyState;
