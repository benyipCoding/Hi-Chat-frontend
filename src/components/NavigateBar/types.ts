import { ReactNode } from 'react';
import { ClassArray } from 'clsx';

export type IconsMapType = {
  [key: string]: (
    inlineStyle: React.CSSProperties | undefined,
    ...styles: ClassArray
  ) => ReactNode;
};
export type IconName = keyof IconsMapType;

export type NavMenuItem = {
  label: string;
  iconOutlined: IconName;
  iconFilled: IconName;
  path: string;
};
