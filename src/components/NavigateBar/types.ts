import { ReactNode } from 'react';

export type IconsMapType = {
  [key: string]: (styles: string[]) => ReactNode;
};
export type IconName = keyof IconsMapType;

export type NavMenuItem = {
  label: string;
  iconOutlined: IconName;
  iconFilled: IconName;
};
