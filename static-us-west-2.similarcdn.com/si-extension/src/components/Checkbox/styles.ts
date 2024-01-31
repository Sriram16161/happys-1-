import { SWReactIcons } from '@similarweb/icons';
import { colorsPalettes, setFontVariant } from '@similarweb/styles';
import styled from 'styled-components';

export const StyledCheckbox = styled.button<{ isChecked?: boolean }>`
  cursor: pointer;
  padding: 0;
  border: none;
  background-color: ${colorsPalettes.carbon[0]};
  display: inline-flex;
  align-items: center;

  ${SWReactIcons} svg path {
    fill: ${({ isChecked }) => (isChecked ? colorsPalettes.blue[400] : colorsPalettes.midnight[100])};
  }
`;

export const StyledCheckboxLabel = styled.span`
  margin-left: 8px;
  ${setFontVariant('body1', colorsPalettes.carbon[300])};

  a {
    color: ${colorsPalettes.blue[400]};
    text-decoration: none;
  }
`;
