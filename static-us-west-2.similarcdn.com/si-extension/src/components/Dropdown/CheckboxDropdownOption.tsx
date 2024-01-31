import React, { ReactNode } from 'react';
import { SWReactIcons } from '@similarweb/icons';
import { StyledCheckboxDropdownOption } from './styles';

export type CheckboxDropdownOptionVariant = 'country' | 'details';

export type CheckboxDropdownOptionProps = {
  isSelected?: boolean;
  onClick?(): void;
  children: ReactNode;
  variant?: CheckboxDropdownOptionVariant;
};

export const CheckboxDropdownOption = ({
  isSelected = false,
  children,
  onClick,
  variant = 'country',
}: CheckboxDropdownOptionProps) => {
  const iconName = isSelected ? 'checkbox-on' : 'checkbox-off';
  return (
    <StyledCheckboxDropdownOption
      data-automation="DropDownCheckbox"
      isSelected={isSelected}
      onClick={onClick}
      variant={variant}
    >
      {variant === 'details' ? (
        <>
          <SWReactIcons iconName={iconName} size="sm" />
          {children}
        </>
      ) : (
        <>
          {children}
          <SWReactIcons iconName={iconName} size="sm" />
        </>
      )}
    </StyledCheckboxDropdownOption>
  );
};
