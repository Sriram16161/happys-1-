import React, { MouseEvent } from 'react';
import { SwitchBackground, SwitchCircle, SwitchContainer } from './styles';

export type SwitchProps = {
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  isDisabled?: boolean;
  isSelected?: boolean;
  className?: string;
};

export const Switch = ({ onClick, isDisabled = false, isSelected = false, className }: SwitchProps) => {
  return (
    <SwitchContainer
      onClick={isDisabled ? undefined : onClick}
      isDisabled={isDisabled}
      data-automation-toggle-switch-disabled={isDisabled}
      data-automation-toggle-switch-selected={isSelected}
      className={className}
    >
      <SwitchBackground isSelected={isSelected} isDisabled={isDisabled} />
      <SwitchCircle isSelected={isSelected} isDisabled={isDisabled} />
    </SwitchContainer>
  );
};

export default Switch;
