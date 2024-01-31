import styled from 'styled-components';
import { colorsPalettes } from '@similarweb/styles';
import { SWReactIcons } from '@similarweb/icons';
import { StyledDropdownOption } from '../../../components/Dropdown/styles';

export const StyledListDropdownOption = styled(StyledDropdownOption)<{ isDisabled?: boolean }>`
  padding: 12px 16px;
  color: ${({ isDisabled }) => (isDisabled ? colorsPalettes.carbon[100] : colorsPalettes.carbon[500])};

  ${SWReactIcons} {
    margin-right: 10px;
    width: 20px;
    height: 20px;
  }
`;
