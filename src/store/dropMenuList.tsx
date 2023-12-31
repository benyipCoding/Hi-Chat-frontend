import { postLogout } from '@/utils/api';
import {
  LogoutOutlined,
  UserAddOutlined,
  WechatFilled,
} from '@ant-design/icons';
import { AppDispatch } from '.';
import { setDrawerTitle, toggleVisible } from './drawerSlice';
import { DropMenuAction } from '@/utils/types';
import { clearGroupSelected } from './friendsSlice';

export type DropMenuType = {
  icon: React.ReactNode;
  label: string;
  onClick: (dispatch: AppDispatch) => void;
};

export const DropMenuList: DropMenuType[] = [
  {
    icon: <WechatFilled className="text-[20px] sm:text-[26px]" />,
    label: DropMenuAction.GROUP_CHAT,
    onClick: (dispatch: AppDispatch) => {
      dispatch(toggleVisible(true));
      dispatch(setDrawerTitle(DropMenuAction.CHOOSE));
      dispatch(clearGroupSelected());
    },
  },
  {
    icon: <UserAddOutlined className="text-[20px] sm:text-[26px]" />,
    label: DropMenuAction.ADD_FRIENDS,
    onClick: (dispatch: AppDispatch) => {
      dispatch(toggleVisible(true));
      dispatch(setDrawerTitle(DropMenuAction.ADD_FRIENDS));
    },
  },
  {
    icon: <LogoutOutlined className="text-[20px] sm:text-[26px]" />,
    label: DropMenuAction.LOGOUT,
    onClick: () => {
      postLogout()
        .then(() => {
          window.location.reload();
        })
        .catch((err) => console.log(err));
    },
  },
];
