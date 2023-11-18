import { postLogout } from '@/utils/api';
import {
  LogoutOutlined,
  UserAddOutlined,
  WechatFilled,
} from '@ant-design/icons';

export type DropMenuType = {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
};

export enum DropMenuAction {
  GROUP_CHAT = 'Group chat',
  ADD_FRIENDS = 'Add friends',
  LOGOUT = 'Logout',
}

export const DropMenuList: DropMenuType[] = [
  {
    icon: <WechatFilled className="text-[20px] sm:text-[26px]" />,
    label: DropMenuAction.GROUP_CHAT,
    onClick: () => {},
  },
  {
    icon: <UserAddOutlined className="text-[20px] sm:text-[26px]" />,
    label: DropMenuAction.ADD_FRIENDS,
    onClick: () => {},
  },
  {
    icon: <LogoutOutlined className="text-[20px] sm:text-[26px]" />,
    label: DropMenuAction.LOGOUT,
    onClick: () => {
      postLogout()
        .then(() => window.location.reload())
        .catch((err) => console.log(err));
    },
  },
];
