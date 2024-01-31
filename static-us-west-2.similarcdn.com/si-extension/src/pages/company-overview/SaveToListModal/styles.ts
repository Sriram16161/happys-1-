import styled from 'styled-components';
import { $robotoFontFamily, colorsPalettes, setFontVariant } from '@similarweb/styles';
import { SWReactIcons } from '@similarweb/icons';
import { StyledDropdownContainer, StyledDropdownOption, StyledSeparator } from '../../../components/Dropdown/styles';
import { StyledModalFooter } from '../../../components/Modal/styles';

export const StyledSaveToListModalTitle = styled.div`
  ${setFontVariant('body1', colorsPalettes.carbon[400])};
  margin-bottom: 16px;
`;

export const StyledListCreateOption = styled(StyledDropdownOption)`
  padding: 10px 16px;
  text-align: left;

  ${SWReactIcons} {
    margin-right: 8px;
  }
`;

export const StyledSaveToListLoader = styled.div`
  width: 100%;
  min-height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledSaveToListDropdownWrapper = styled.div`
  position: relative;
  width: 100%;

  ${StyledDropdownContainer} {
    width: 100%;
  }
`;

export const StyledSaveToListSelect = styled.button<{ isSelected?: boolean }>`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 3px;
  background-color: ${colorsPalettes.carbon[0]};
  padding: 8px;
  color: ${(props) => (props.isSelected ? colorsPalettes.carbon[400] : colorsPalettes.carbon[200])};
  font-family: ${$robotoFontFamily};
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  border: 1px solid #f2f2f2;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  ${SWReactIcons} {
    margin-left: 4px;

    svg path {
      fill: ${colorsPalettes.carbon[500]};
      transition: fill 0.2s ease-in-out;
    }
  }
`;

export const StyledList = styled.div`
  overflow-y: auto;
`;

export const StyledListDropdownOption = styled(StyledDropdownOption)<{ isDisabled?: boolean }>`
  padding: 12px 16px;
  color: ${({ isDisabled }) => (isDisabled ? colorsPalettes.carbon[100] : colorsPalettes.carbon[500])};

  ${SWReactIcons} {
    margin-right: 10px;
    width: 20px;
    height: 20px;
  }
`;

export const StyledSaveToListSeparator = styled(StyledSeparator)`
  height: 1px;
  margin-bottom: 8px;
`;

export const StyledCreateNewListWrapper = styled.div`
  margin: 12px;
`;

export const StyledCreateNewListText = styled.div`
  ${setFontVariant('body1', colorsPalettes.carbon[300])};
  font-size: 12px;
  margin: 4px 0;
`;

export const StyledCreateNewListTextInput = styled.input`
  width: 100%;
  height: 40px;
  ${setFontVariant('input2')};
  padding: 4px 16px;
  border: 1px solid ${colorsPalettes.midnight[50]};
  border-radius: 3px;

  ::placeholder {
    color: ${colorsPalettes.carbon[200]};
  }

  &:focus {
    border-color: ${colorsPalettes.blue[400]};
    outline: none;
  }
`;

export const StyledCreateNewListModalFooter = styled(StyledModalFooter)`
  margin-top: 16px;
`;
