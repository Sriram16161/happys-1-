import { SWReactIcons } from '@similarweb/icons';
import { colorsPalettes, setFontVariant } from '@similarweb/styles';
import styled, { css } from 'styled-components';
import { CheckboxDropdownOptionVariant } from './CheckboxDropdownOption';
import { Placement } from './Dropdown';

export const StyledDropdownContainer = styled.div<{
  placement: Placement;
  minWidth?: number | string;
  maxHeight?: number;
}>`
  position: absolute;
  bottom: -4px;
  transform: translateY(100%);
  z-index: 1;
  display: flex;
  flex-direction: column;
  min-width: ${({ minWidth = 246 }) => (typeof minWidth === 'string' ? minWidth : `${minWidth}px`)};
  border: 1px solid ${colorsPalettes.carbon[100]};
  background-color: ${colorsPalettes.carbon[0]};
  box-shadow: 0px 3px 5px rgba(42, 62, 82, 0.12);
  border-radius: 3px;
  max-height: ${({ maxHeight = 500 }) => `${maxHeight}px`};
  overflow: auto;

  ${({ placement }) => {
    switch (placement) {
      case 'left':
        return css`
          left: 0;
        `;
      case 'right':
        return css`
          right: 0;
        `;
    }
  }}
`;

export const StyledSeparator = styled.div<{ color?: string }>`
  width: 100%;
  height: 16px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    height: 1px;
    top: 50%;
    left: 10px;
    width: calc(100% - 20px);
    background-color: ${({ color = colorsPalettes.blue[400] }) => color};
  }
`;

export const StyledSearchField = styled.div`
  display: inline-flex;
  padding: 16px 16px 8px 16px;
  align-items: center;
  width: 100%;
`;

export const StyledSearchInput = styled.input`
  border: none;
  outline: none;
  ${setFontVariant('body2', colorsPalettes.carbon[400])};
  flex-grow: 1;
  margin-left: 8px;
`;

export const StyledDropdownOption = styled.button<{ isSelected?: boolean; isDisabled?: boolean }>`
  padding: 14px 16px;
  background-color: ${colorsPalettes.carbon[0]};
  ${setFontVariant('input2', colorsPalettes.carbon[500])};
  border: none;
  cursor: ${({ isDisabled }) => (isDisabled ? 'auto' : 'pointer')};
  transition: background-color 0.2s ease-in-out;
  display: inline-flex;
  align-items: center;
  width: 100%;
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};

  ${({ isSelected }) => isSelected && `background-color: ${colorsPalettes.bluegrey[100]};`}

  &:hover {
    background-color: ${({ isDisabled }) => (isDisabled ? colorsPalettes.carbon[0] : colorsPalettes.carbon[25])};
  }
`;

export const StyledDropdownButton = styled.button<{ isSelected?: boolean; isActive?: boolean }>`
  border-radius: 3px;
  background-color: ${({ isActive, isSelected }) => {
    if (isActive) return colorsPalettes.bluegrey[300];
    if (isSelected) return colorsPalettes.carbon[50];
    return colorsPalettes.carbon[25];
  }};
  padding: 8px;
  ${setFontVariant('sectionTitle', colorsPalettes.carbon[500])};
  font-weight: 500;
  line-height: 16px;
  border: 1px solid #f2f2f2;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  ${SWReactIcons} {
    margin-left: 4px;

    svg path {
      fill: ${colorsPalettes.carbon[500]};
      transition: fill 0.2s ease-in-out;
    }
  }

  &:hover {
    background-color: ${colorsPalettes.bluegrey[100]};
    color: ${colorsPalettes.blue[400]};
    ${SWReactIcons} svg path {
      fill: ${colorsPalettes.blue[400]};
    }
  }

  ${({ isActive }) =>
    isActive &&
    css`
      opacity: 1 !important;
      color: ${colorsPalettes.blue[400]};

      ${SWReactIcons} svg path {
        fill: ${colorsPalettes.blue[400]};
      }
    `}

  &:active {
    background-color: ${colorsPalettes.blue[200]};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${colorsPalettes.carbon[25]};
    color: ${colorsPalettes.carbon[200]}!important;

    ${SWReactIcons} svg path {
      fill: ${colorsPalettes.carbon[200]}!important;
    }
  }
`;

export const StyledCheckboxDropdownOption = styled.button<{
  isSelected?: boolean;
  variant?: CheckboxDropdownOptionVariant;
}>`
  padding: ${({ variant }) => (variant === 'details' ? '4px 16px' : '10px 16px')};
  background-color: ${colorsPalettes.carbon[0]};
  ${setFontVariant('input2', colorsPalettes.carbon[500])};
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  display: inline-flex;
  align-items: center;
  text-align: left;
  width: 100%;

  &:hover {
    background-color: ${colorsPalettes.carbon[25]};
  }

  ${SWReactIcons} {
    flex-shrink: 0;
    margin-left: ${({ variant }) => (variant === 'details' ? 0 : 'auto')};

    svg path {
      fill: ${({ isSelected }) => (isSelected ? colorsPalettes.blue[400] : colorsPalettes.midnight[100])};
    }
  }
`;
