import React, { ReactNode, MouseEvent } from 'react';
import { StyledActionButton } from './styles';

export type ActionButtonProps = {
  children: ReactNode;
  onClick?(event: MouseEvent<HTMLButtonElement>): void;
  className?: string;
  disabled?: boolean;
  isActive?: boolean;
  isLoading?: boolean;
  isSelected?: boolean;
  'data-automation'?: string;
};

export const ActionButton = (props: ActionButtonProps) => {
  const { onClick, className, disabled, isActive, isLoading, isSelected, children } = props;
  return (
    <StyledActionButton
      onClick={onClick}
      className={className}
      disabled={disabled}
      isActive={isActive}
      isLoading={isLoading}
      isSelected={isSelected}
      data-automation={props['data-automation']}
    >
      {children}
    </StyledActionButton>
  );
};
