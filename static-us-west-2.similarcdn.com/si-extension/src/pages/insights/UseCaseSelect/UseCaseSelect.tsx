import React, { FC, useState } from 'react';
import { SWReactIcons } from '@similarweb/icons';
import { Dropdown } from '../../../components/Dropdown';
import { StyledDropdownButton, StyledDropdownOption } from '../../../components/Dropdown/styles';
import { StyledUseCaseSelect } from './styles';

const options = ['general', 'shipping', 'payment'];

export type UseCaseSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export const UseCaseSelect: FC<UseCaseSelectProps> = ({ value, onChange }) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleOptionSelect = (option: string) => {
    onChange(option);
    setIsOpened(false);
  };

  return (
    <StyledUseCaseSelect>
      <StyledDropdownButton onClick={() => setIsOpened(true)}>
        {value}
        <SWReactIcons iconName="chev-down" size="xs" />
      </StyledDropdownButton>
      <Dropdown isOpened={isOpened} onClose={() => setIsOpened(false)} minWidth={86}>
        {options.map((option) => (
          <StyledDropdownOption key={option} onClick={() => handleOptionSelect(option)} isSelected={option === value}>
            {option}
          </StyledDropdownOption>
        ))}
      </Dropdown>
    </StyledUseCaseSelect>
  );
};
