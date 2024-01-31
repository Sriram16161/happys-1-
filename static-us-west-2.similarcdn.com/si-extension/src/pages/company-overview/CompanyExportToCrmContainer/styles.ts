import styled from 'styled-components';
import { colorsPalettes, setFontVariant } from '@similarweb/styles';
import { StyledDropdownOption } from '../../../components/Dropdown/styles';

export const StyledExportToCrmOption = styled(StyledDropdownOption)<{ isDisabled?: boolean }>`
  display: block;
  text-align: left;
  color: ${({ isDisabled }) => (isDisabled ? colorsPalettes.carbon[100] : colorsPalettes.carbon[500])};
  cursor: ${({ isDisabled }) => (isDisabled ? 'not-allowed' : 'pointer')};

  a {
    color: inherit;
    text-decoration: none;
  }
`;

export const StyledExportToCrmOptionTitle = styled.p`
  margin: 0 0 6px 0;
  text-align: left;
`;

export const StyledExportToCrmOptionQuota = styled.p<{ isDisabled?: boolean }>`
  margin: 0 0 4px 0;
  ${setFontVariant('listItem3')};
  color: ${({ isDisabled }) => (isDisabled ? colorsPalettes.carbon[100] : colorsPalettes.carbon[300])};
  text-align: left;

  span {
    font-weight: 700;
  }
`;
