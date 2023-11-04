import React from 'react';
import { IconName, IconsMapType } from '../NavigateBar/types';
import { ClassArray } from 'clsx';

interface DynamicComponentProps {
  is: IconName;
  styles: ClassArray;
  resource: IconsMapType;
  inlineStyle?: React.CSSProperties | undefined;
}

const DynamicComponent: React.FC<DynamicComponentProps> = ({
  is,
  styles,
  resource,
  inlineStyle,
}) => {
  const componentToRender = resource[is](inlineStyle, styles);
  return <>{componentToRender}</>;
};

export default DynamicComponent;
