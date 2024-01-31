import React from 'react';
import { StyledField, StyledFieldLabel, StyledFieldInput } from './styles';

export type TextFieldProps = {
  label: string;
  value: string;
  onChange(value: string): void;
  placeholder: string;
};

export const TextField = ({ label, value, onChange, placeholder }: TextFieldProps) => {
  return (
    <StyledField data-automation="PersonaTextField">
      <StyledFieldLabel data-automation="PersonaTextFieldLabel">{label}</StyledFieldLabel>
      <StyledFieldInput
        data-automation="PersonaTextFieldInput"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </StyledField>
  );
};
