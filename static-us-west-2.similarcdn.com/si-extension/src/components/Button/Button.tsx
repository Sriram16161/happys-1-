import React, { ReactNode, MouseEvent } from 'react';
import { ButtonVariant } from './ButtonVariant';
import { StyledButton } from './styles';

export type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  onClick?(event: MouseEvent<HTMLButtonElement>): void;
  className?: string;
  disabled?: boolean;
  'data-automation'?: string;
};

export const Button = (props: ButtonProps) => {
  const { children, variant = 'primary', onClick, className, disabled } = props;
  return (
    <StyledButton
      variant={variant}
      onClick={onClick}
      className={className}
      disabled={disabled}
      data-automation={props['data-automation']}
    >
      {children}
    </StyledButton>
  );
};
