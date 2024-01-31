import styled from 'styled-components';
import { colorsPalettes, setFontVariant } from '@similarweb/styles';
import { SWReactIcons } from '@similarweb/icons';

export const StyledTrafficSectionHeader = styled.header<{ withPadding?: boolean }>`
  display: flex;
  flex-wrap: wrap;
  padding: ${({ withPadding }) => (withPadding ? 0 : '0 24px 8px')};
`;

export const StyledTrafficSectionHeading = styled.h3`
  ${setFontVariant('report', colorsPalettes.carbon[400])};
  font-size: 16px;
  line-height: 18px;
  margin: 0 0 12px;
  width: 100%;
`;

export const StyledTrafficSectionDataRange = styled.span`
  ${setFontVariant('sectionTitle', colorsPalettes.carbon[250])};
  font-size: 14px;
  margin-right: 8px;
`;

export const StyledDeviceIcon = styled(SWReactIcons)`
  svg path {
    fill: ${colorsPalettes.carbon[200]};
  }
`;
