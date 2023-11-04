import * as Icons from '@ant-design/icons';
import clsx from 'clsx';
import { IconsMapType, NavMenuItem } from './types';

export const IconsMap: IconsMapType = {
  MessageOutlined: (styles) => (
    <Icons.MessageOutlined className={clsx(...styles)} />
  ),
  MessageFilled: (styles) => (
    <Icons.MessageFilled className={clsx(...styles)} />
  ),
  ContactsOutlined: (styles) => (
    <Icons.ContactsOutlined className={clsx(...styles)} />
  ),
  ContactsFilled: (styles) => (
    <Icons.ContactsFilled className={clsx(...styles)} />
  ),
  CompassOutlined: (styles) => (
    <Icons.CompassOutlined className={clsx(...styles)} />
  ),
  CompassFilled: (styles) => (
    <Icons.CompassFilled className={clsx(...styles)} />
  ),
  ProfileOutlined: (styles) => (
    <Icons.ProfileOutlined className={clsx(...styles)} />
  ),
  ProfileFilled: (styles) => (
    <Icons.ProfileFilled className={clsx(...styles)} />
  ),
};

export const NavMenuList: NavMenuItem[] = [
  {
    label: 'Message',
    iconOutlined: 'MessageOutlined',
    iconFilled: 'MessageFilled',
  },
  {
    label: 'Contacts',
    iconOutlined: 'ContactsOutlined',
    iconFilled: 'ContactsFilled',
  },
  {
    label: 'Discovery',
    iconOutlined: 'CompassOutlined',
    iconFilled: 'CompassFilled',
  },
  {
    label: 'Profile',
    iconOutlined: 'ProfileOutlined',
    iconFilled: 'ProfileFilled',
  },
];
