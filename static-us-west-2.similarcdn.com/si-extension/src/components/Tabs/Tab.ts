import { ComponentType } from 'react';
import { SWReactIconProps } from '@similarweb/icons';

export type Tab<T> = {
  name: T;
  component: ComponentType;
  label: string;
  iconProps?: SWReactIconProps & { colorMethod?: 'stroke' | 'fill'; width?: number };
};
