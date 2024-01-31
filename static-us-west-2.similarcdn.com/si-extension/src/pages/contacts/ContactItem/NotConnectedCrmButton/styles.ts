import styled from 'styled-components';
import { colorsPalettes } from '@similarweb/styles';
import { SWReactIcons } from '@similarweb/icons';
import { StyledDropdownOption } from '../../../../components/Dropdown/styles';

export const StyledCrmExportMenu = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const StyledCrmExportMenuItem = styled(StyledDropdownOption)`
  display: flex;
  color: ${colorsPalettes.carbon[100]};

  ${SWReactIcons} {
    margin-right: 8px;
  }
`;

export const StyledCrmExportMenuLink = styled.a`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${colorsPalettes.carbon[500]};
`;
