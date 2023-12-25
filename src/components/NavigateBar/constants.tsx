import * as Icons from '@ant-design/icons';
import clsx from 'clsx';
import { IconsMapType, NavMenuItem } from './types';
import { FaRegUser, FaUser } from 'react-icons/fa';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { HiUserGroup } from 'react-icons/hi';

export const IconsMap: IconsMapType = {
  MessageOutlined: (_, styles) => (
    <Icons.MessageOutlined className={clsx(...[styles])} />
  ),
  MessageFilled: (inlineStyle, styles) => (
    <Icons.MessageFilled className={clsx(...[styles])} style={inlineStyle} />
  ),
  ContactsOutlined: (_, styles) => (
    <Icons.ContactsOutlined className={clsx(...[styles])} />
  ),
  ContactsFilled: (inlineStyle, styles) => (
    <Icons.ContactsFilled className={clsx(...[styles])} style={inlineStyle} />
  ),
  HiOutlineUserGroup: (_, styles) => (
    <HiOutlineUserGroup className={clsx(...[styles])} />
  ),
  HiUserGroup: (inlineStyle, styles) => (
    <HiUserGroup className={clsx(...[styles])} style={inlineStyle} />
  ),
  ProfileOutlined: (_, styles) => <FaRegUser className={clsx(...[styles])} />,
  ProfileFilled: (inlineStyle, styles) => (
    <FaUser className={clsx(...[styles])} style={inlineStyle} />
  ),
};

export const NavMenuList: NavMenuItem[] = [
  {
    label: 'Message',
    iconOutlined: 'MessageOutlined',
    iconFilled: 'MessageFilled',
    path: '/messages',
  },
  {
    label: 'Contacts',
    iconOutlined: 'ContactsOutlined',
    iconFilled: 'ContactsFilled',
    path: '/contacts',
  },
  {
    label: 'GroupChat',
    iconOutlined: 'HiOutlineUserGroup',
    iconFilled: 'HiUserGroup',
    path: '/groupchat',
  },
  {
    label: 'Profile',
    iconOutlined: 'ProfileOutlined',
    iconFilled: 'ProfileFilled',
    path: '/profile',
  },
];
