import { AppDispatch, RootState } from '@/store';
import { toggleVisible } from '@/store/drawerSlice';
import { Drawer as DrawerAntd } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import AddFriends from '../AddFriends/AddFriends';
import { useScreenSize } from '@/hooks/useScreenSize';
import { DropMenuAction } from '@/utils/types';
import GroupChatMenu from '../GroupChat/GroupChatMenu';

const Drawer = () => {
  const { visible } = useSelector((state: RootState) => state.drawer);
  const dispatch = useDispatch<AppDispatch>();
  const isLarge = useScreenSize();
  const placement = isLarge() ? 'right' : 'bottom';
  const { drawerTitle } = useSelector((state: RootState) => state.drawer);

  return (
    <DrawerAntd
      title={<span className="text-slate-900">{drawerTitle}</span>}
      placement={placement}
      onClose={() => dispatch(toggleVisible(false))}
      open={visible}
      height={'85%'}
      width={'28%'}
      classNames={{
        header: 'bg-gradient-to-r from-slate-50 to-slate-200',
        body: 'bg-gradient-to-b from-slate-50 to-gray-100',
      }}
    >
      {drawerTitle === DropMenuAction.ADD_FRIENDS ? (
        <AddFriends />
      ) : (
        <GroupChatMenu />
      )}
    </DrawerAntd>
  );
};

export default Drawer;
