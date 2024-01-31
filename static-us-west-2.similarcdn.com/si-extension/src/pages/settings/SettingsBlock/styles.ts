import styled from 'styled-components';
import { colorsPalettes, setFontVariant } from '@similarweb/styles';
import { SWReactIcons } from '@similarweb/icons';

export const StyledSettingsBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 16px 16px 12px;
  margin: 16px 0;
  border: 1px solid ${colorsPalettes.carbon[50]};
  border-radius: 8px;
`;

export const StyledSettingsItem = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const StyledSettingsItemTitle = styled.div`
  display: flex;
  align-items: flex-start;
  margin-right: 18px;
`;

export const StyledSettingsItemIcon = styled(SWReactIcons)`
  flex: none;
  margin-right: 8px;
`;

export const StyledSettingsItemText = styled.p`
  ${setFontVariant('report', colorsPalettes.carbon[500])};
  line-height: 20px;
  margin: 0;
`;

export const StyledSettingsItemTextDescription = styled.p`
  ${setFontVariant('sectionTitle', colorsPalettes.carbon[250])};
  margin: 4px 0;
`;
