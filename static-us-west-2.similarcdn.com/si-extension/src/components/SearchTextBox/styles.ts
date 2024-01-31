import styled from 'styled-components';
import { colorsPalettes, setFontVariant } from '@similarweb/styles';
import { SWReactIcons } from '@similarweb/icons';

export const StyledClearIconContainer = styled.div`
  cursor: pointer;
  position: absolute;
  right: 6px;
  top: 50%;
  transform: translateY(-50%);

  &::after {
    content: '';
    height: 200%;
    left: -50%;
    position: absolute;
    top: -50%;
    width: 200%;
  }
`;

export const StyledInput = styled.input<{ isDisabled: boolean }>`
  display: block;
  height: 30px;
  margin: 0;
  padding: 0 0 0 8px;
  width: 100%;
  ${setFontVariant('tab', colorsPalettes.carbon[300])};
  font-weight: 400;
  background-color: ${colorsPalettes.carbon[0]};
  border: none;
  box-shadow: none;
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'unset')};

  &:focus {
    outline: none;
  }
`;

export const StyledSearchIcon = styled(SWReactIcons)`
  padding-left: 3px;
`;

export const StyledSearchInputContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  position: relative;
  background-color: ${colorsPalettes.carbon[0]};
  border: 1px solid ${colorsPalettes.midnight[50]};
  border-radius: 3px;
  padding-left: 3px;
`;
