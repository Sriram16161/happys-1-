import styled from 'styled-components';
import { colorsPalettes, setFontVariant } from '@similarweb/styles';

export const StyledSettingsLinkContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 18px 0;
`;

export const StyledSettingsLinkIcon = styled.a`
  padding-bottom: 3px;
  cursor: pointer;
`;

export const StyledSettingsLinkTitle = styled.div`
  display: flex;
  align-items: center;

  span {
    padding: 0 8px;
    ${setFontVariant('report', colorsPalettes.carbon[250])};
    line-height: 20px;
  }
`;

export const StyledSettingsFooter = styled.div`
  padding: 16px 14px 16px 16px;
  border-top: 1px solid #e6e6e6;
`;
