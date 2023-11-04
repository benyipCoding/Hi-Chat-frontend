import React, { ReactNode } from 'react';
import { IconName } from '../NavigateBar/types';

interface DynamicComponentProps {
  is: IconName;
  styles: string[];
  resource: Record<string, (styles: string[]) => ReactNode>;
}

const DynamicComponent: React.FC<DynamicComponentProps> = ({
  is,
  styles,
  resource,
}) => {
  const componentToRender = resource[is](styles);
  return <>{componentToRender}</>;
};

export default DynamicComponent;
