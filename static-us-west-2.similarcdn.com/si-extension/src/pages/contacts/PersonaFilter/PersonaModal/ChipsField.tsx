import React, { useState, KeyboardEvent } from 'react';
import { SWReactIcons } from '@similarweb/icons';
import {
  StyledAddDropdownOption,
  StyledChip,
  StyledChips,
  StyledField,
  StyledFieldInput,
  StyledFieldLabel,
  StyledInputDropdown,
} from './styles';

export type ChipsFieldProps = {
  label: string;
  value: string[];
  onChange(value: string[]): void;
  placeholder: string;
};

export const ChipsField = ({ label, value, onChange, placeholder }: ChipsFieldProps) => {
  const [isInputInFocus, setIsInputInFocus] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const trimmedValue = inputValue.trim();
  const canAddValue = !!trimmedValue && !value.includes(trimmedValue);

  const addValue = () => {
    onChange([...value, trimmedValue]);
    setInputValue('');
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key !== 'Enter' || !canAddValue) return;
    addValue();
  };

  return (
    <StyledField data-automation="ChipField">
      <StyledFieldLabel data-automation={`ChipFieldLabel-${label}`} isInner>
        {label}
      </StyledFieldLabel>

      {value.length > 0 && (
        <StyledChips>
          {value.map((chip) => (
            <StyledChip data-automation={`ChipItem-${chip}`} key={chip}>
              {chip}
              <div onClick={() => onChange(value.filter((v) => v !== chip))}>
                <SWReactIcons iconName="clear-circle" size="sm" />
              </div>
            </StyledChip>
          ))}
        </StyledChips>
      )}
      <StyledFieldInput
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        onKeyUp={handleKeyUp}
        onFocus={() => setIsInputInFocus(true)}
        onBlur={() => setIsInputInFocus(false)}
      />
      <StyledInputDropdown data-automation="ChipDropdown" isOpened={canAddValue && isInputInFocus} onClose={() => null}>
        <StyledAddDropdownOption data-automation={`ChipDropdownOption-${trimmedValue}`} onClick={addValue}>
          <SWReactIcons iconName="add" size="sm" />
          add&nbsp;<b>"{trimmedValue}"</b>
        </StyledAddDropdownOption>
      </StyledInputDropdown>
    </StyledField>
  );
};
