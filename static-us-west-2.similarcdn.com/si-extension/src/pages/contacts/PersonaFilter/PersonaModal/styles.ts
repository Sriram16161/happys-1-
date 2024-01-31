import styled from 'styled-components';
import { colorsPalettes, rgba, setFontVariant } from '@similarweb/styles';
import { SWReactIcons } from '@similarweb/icons';
import { Dropdown } from '../../../../components/Dropdown';
import { StyledDropdownOption } from '../../../../components/Dropdown/styles';

export const StyledField = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  margin-bottom: 12px;
`;

export const StyledFieldLabel = styled.span<{ isInner?: boolean }>`
  ${setFontVariant('caption')};
  color: ${({ isInner }) => (isInner ? colorsPalettes.carbon[250] : colorsPalettes.carbon[500])};
`;

export const StyledFieldInput = styled.input`
  margin: 4px 0;
  padding: 12px 16px;
  border-radius: 3px;
  border: 1px solid ${colorsPalettes.carbon[50]};
  background-color: ${colorsPalettes.carbon[0]};
  outline: none;
  ${setFontVariant('input2', colorsPalettes.carbon[300])};

  ::placeholder {
    color: ${colorsPalettes.carbon[200]};
  }

  &:focus {
    border-color: ${colorsPalettes.blue[400]};
  }
`;

export const StyledSelectButton = styled.button<{ isEmpty?: boolean; isOpened?: boolean }>`
  display: inline-flex;
  margin-top: 4px;
  padding: 12px 8px 12px 16px;
  height: 40px;
  border-radius: 3px;
  border: 1px solid ${colorsPalettes.carbon[50]};
  background-color: ${colorsPalettes.carbon[0]};
  outline: none;
  box-shadow: none;
  ${setFontVariant('input2')};
  color: ${({ isEmpty }) => (isEmpty ? colorsPalettes.carbon[200] : colorsPalettes.carbon[300])};
  cursor: pointer;

  ${SWReactIcons} {
    margin-left: auto;
    transition: transform 0.2s ease-in-out;
    transform: ${({ isOpened }) => (isOpened ? 'rotate(180deg) translateY(-4px)' : 'rotate(0deg)')};
  }
`;

export const StyledDropdown = styled(Dropdown)`
  width: 100%;
`;

export const StyledSectionTitle = styled.span`
  ${setFontVariant('caption', colorsPalettes.carbon[500])};
`;

export const StyledChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 8px;
  margin: 8px 0;
`;

export const StyledChip = styled.div`
  background-color: ${rgba(colorsPalettes.carbon[500], 0.1)};
  display: inline-flex;
  align-items: center;
  padding: 4px 4px 4px 12px;
  gap: 8px;
  border-radius: 40px;
  ${setFontVariant('chip1', colorsPalettes.carbon[500])};

  ${SWReactIcons} {
    cursor: pointer;
  }
`;

export const StyledInputDropdown = styled(Dropdown)`
  padding: 8px 0;
  width: 100%;
`;

export const StyledAddDropdownOption = styled(StyledDropdownOption)`
  ${SWReactIcons} {
    margin: -4px 8px -4px 0;

    svg path {
      fill: ${colorsPalettes.blue[400]};
    }
  }

  color: ${colorsPalettes.blue[400]};

  &:hover {
    background-color: ${colorsPalettes.bluegrey[100]};
  }
`;

export const SubmitButtonTooltip = styled.div`
  width: 111px;
`;

export const StyledConfirmDeleteContent = styled.p`
  ${setFontVariant('body1', colorsPalettes.carbon[400])};
  margin: 0 8px;
`;
