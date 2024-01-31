import React, { FC, ReactNode } from 'react';
import { StyledCheckbox, StyledCheckboxLabel } from './styles';
import { IconName, SWReactIcons } from '@similarweb/icons';

export type CheckboxProps = {
  isChecked?: boolean;
  isHalfChecked?: boolean;
  onClick?(): void;
  label: ReactNode;
  className?: string;
  disabled?: boolean;
};

export const Checkbox: FC<CheckboxProps> = ({ onClick, isChecked, isHalfChecked, label, className }) => {
  const iconName: IconName = isHalfChecked ? 'checkbox-int' : isChecked ? 'checkbox-on' : 'checkbox-off';
  return (
    <StyledCheckbox onClick={onClick} isChecked={isChecked || isHalfChecked} className={className}>
      <SWReactIcons iconName={iconName} size="sm" />
      <StyledCheckboxLabel>{label}</StyledCheckboxLabel>
    </StyledCheckbox>
  );
};
