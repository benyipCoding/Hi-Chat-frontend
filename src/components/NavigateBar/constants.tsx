import * as Icons from '@ant-design/icons';
import clsx from 'clsx';
import { IconsMapType, NavMenuItem } from './types';

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
  CompassOutlined: (_, styles) => (
    <Icons.CompassOutlined className={clsx(...[styles])} />
  ),
  CompassFilled: (inlineStyle, styles) => (
    <Icons.CompassFilled className={clsx(...[styles])} style={inlineStyle} />
  ),
  ProfileOutlined: (_, styles) => (
    <Icons.ProfileOutlined className={clsx(...[styles])} />
  ),
  ProfileFilled: (inlineStyle, styles) => (
    <Icons.ProfileFilled className={clsx(...[styles])} style={inlineStyle} />
  ),
};

export const NavMenuList: NavMenuItem[] = [
  {
    label: 'Message',
    iconOutlined: 'MessageOutlined',
    iconFilled: 'MessageFilled',
    path: '/messages',
    badge: 1,
  },
  {
    label: 'Contacts',
    iconOutlined: 'ContactsOutlined',
    iconFilled: 'ContactsFilled',
    path: '/contacts',
    badge: 2,
  },
  {
    label: 'Discovery',
    iconOutlined: 'CompassOutlined',
    iconFilled: 'CompassFilled',
    path: '/discovery',
    badge: 3,
  },
  {
    label: 'Profile',
    iconOutlined: 'ProfileOutlined',
    iconFilled: 'ProfileFilled',
    path: '/profile',
    badge: 4,
  },
];
