import { colorsPalettes, setFontVariant } from '@similarweb/styles';
import { SWReactIcons } from '@similarweb/icons';
import styled from 'styled-components';
import { StyledDropdownOption } from '../../../components/Dropdown/styles';
import { Dropdown } from '../../../components/Dropdown';

export const StyledFilterContainer = styled.div`
  margin-top: 8px;
  position: relative;
`;

export const StyledEditButton = styled.div`
  padding: 8px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  box-shadow: none;
  background-color: transparent;
  transition: background-color 0.2s ease-in-out;
  border-radius: 50%;
  margin: -12px 0 -12px auto;

  ${SWReactIcons} {
    opacity: 0;
    transition: opacity 0.2s ease-in-out;

    svg path {
      fill: ${colorsPalettes.carbon[300]};
    }
  }

  &:hover {
    background-color: rgba(181, 190, 198, 0.2);
  }
`;

export const StyledPersonaOption = styled(StyledDropdownOption)`
  text-align: left;

  &:hover {
    ${StyledEditButton} ${SWReactIcons} {
      opacity: 1;
    }
  }
`;

export const StyledSharedIcon = styled(SWReactIcons)`
  margin-left: 8px;

  svg {
    width: 13px;
    height: 13px;
  }
`;

export const StyledCreateOption = styled.button`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  ${setFontVariant('input2', colorsPalettes.carbon[500])};
  border: none;
  box-shadow: none;
  background-color: ${colorsPalettes.carbon[0]};
  padding: 12px 16px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  ${SWReactIcons} {
    margin-right: 6px;
  }

  &:hover {
    background-color: ${colorsPalettes.carbon[25]};
  }
`;

export const StyledCreateOptionDescription = styled.div`
  width: 100%;
  padding-left: 30px;
  ${setFontVariant('listItem3', colorsPalettes.carbon[300])};
  text-align: left;
  margin-top: 6px;
`;

export const StyledSeparator = styled.div`
  height: 1px;
  width: 100%;
  margin: 8px 0 7px;
  background-color: ${colorsPalettes.carbon[100]};
`;

export const StyledPersonaDropdown = styled(Dropdown)`
  width: 246px;
`;
