import { AppDispatch, RootState } from '@/store';
import { toggleVisible } from '@/store/drawerSlice';

import { Drawer as DrawerAntd } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import AddFriends from '../AddFriends/AddFriends';

const Drawer = () => {
  const { visible } = useSelector((state: RootState) => state.drawer);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <DrawerAntd
      title={<span className="text-slate-900">Add friends</span>}
      placement="bottom"
      onClose={() => dispatch(toggleVisible(false))}
      open={visible}
      height={'85%'}
      classNames={{
        header: 'bg-gradient-to-r from-slate-50 to-slate-200',
        body: 'bg-gradient-to-b from-slate-50 to-gray-100',
      }}
    >
      <AddFriends />
    </DrawerAntd>
  );
};

export default Drawer;
