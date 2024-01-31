import styled from 'styled-components';
import { $robotoFontFamily, colorsPalettes, setFontVariant } from '@similarweb/styles';
import { StyledDropdownContainer, StyledDropdownOption } from '../../../../components/Dropdown/styles';
import { SWReactIcons } from '@similarweb/icons';

export const StyledCrmExportPreviewModalText = styled.div`
  ${setFontVariant('body1', colorsPalettes.carbon[400])};
  margin-bottom: 16px;
`;

export const StyledAccountOptionLink = styled.a`
  opacity: 0;
  margin: 0 8px;

  ${SWReactIcons} svg {
    width: 18px;
    height: 18px;
  }
`;

export const StyledAccountOption = styled(StyledDropdownOption)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-align: left;
  padding-left: 40px;

  &:hover {
    ${StyledAccountOptionLink} {
      opacity: 1;
    }
  }
`;

export const StyledAccountSection = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 16px;
  text-align: left;
  ${setFontVariant('input2', colorsPalettes.carbon[500])};
  font-weight: 500;
`;

export const StyledAccountCreateOption = styled(StyledDropdownOption)`
  text-align: left;

  ${SWReactIcons} {
    margin-right: 8px;
  }
`;

export const StyledCrmExportPreviewLoader = styled.div`
  width: 100%;
  min-height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledCrmExportDropdownWrapper = styled.div`
  position: relative;
  width: 100%;

  ${StyledDropdownContainer} {
    width: 100%;
  }
`;

export const StyledCrmExportPreviewSelect = styled.button<{ isSelected?: boolean }>`
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

export const StyledNewAccount = styled.div`
  margin-bottom: 4px;
  color: ${colorsPalettes.orange[400]};
  font-size: 9px;
  font-weight: 500;
  line-height: 8px;
  text-transform: uppercase;
`;

export const StyledAccountsList = styled.div`
  overflow-y: auto;
`;
