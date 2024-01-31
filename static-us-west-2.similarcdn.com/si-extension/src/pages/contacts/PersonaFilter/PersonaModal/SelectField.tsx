import React, { useState } from 'react';
import { SWReactIcons } from '@similarweb/icons';
import { CheckboxDropdownOption } from '../../../../components/Dropdown';
import { StyledField, StyledFieldLabel, StyledSelectButton, StyledDropdown } from './styles';

export type SelectFieldProps = {
  label: string;
  value: string[];
  onChange(value: string[]): void;
  options: string[];
  placeholder: string;
};

export const SelectField = ({ label, value, options, onChange, placeholder }: SelectFieldProps) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleOptionSelect = (option: string) => {
    if (value.includes(option)) {
      onChange(value.filter((v) => v !== option));
    } else {
      onChange([...value, option]);
    }
  };

  const getButtonText = () => {
    if (value.length === 0) return placeholder;

    const MAX_LENGTH = 28;
    let text = '';
    const remainingOptions = [...value];

    while (text.length < MAX_LENGTH && remainingOptions.length > 0) {
      const option = remainingOptions.shift()!;
      if (option.length + text.length > MAX_LENGTH) {
        remainingOptions.unshift(option);
        break;
      }

      if (text.length !== 0) text += ', ';
      text += option;
    }

    if (remainingOptions.length > 0) {
      text += ` +${remainingOptions.length}`;
    }

    return text;
  };

  return (
    <StyledField data-automation="PersonaSelectField">
      <StyledFieldLabel data-automation="PersonaSelectFieldLabel">{label}</StyledFieldLabel>
      <StyledSelectButton
        data-automation="PersonaSelectButton"
        onClick={() => setIsOpened(true)}
        isEmpty={value.length === 0}
        isOpened={isOpened}
      >
        {getButtonText()}
        <SWReactIcons iconName="arrow" size="xs" />
      </StyledSelectButton>
      <StyledDropdown
        data-automation="PersonaSelectDropdown"
        isOpened={isOpened}
        onClose={() => setIsOpened(false)}
        maxHeight={222}
      >
        {options.map((option) => (
          <CheckboxDropdownOption
            key={option}
            isSelected={value.includes(option)}
            onClick={() => handleOptionSelect(option)}
          >
            {option}
          </CheckboxDropdownOption>
        ))}
      </StyledDropdown>
    </StyledField>
  );
};
