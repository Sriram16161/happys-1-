import { SWReactIcons } from '@similarweb/icons';
import { colorsPalettes, setFontVariant } from '@similarweb/styles';
import styled from 'styled-components';
import { Button } from '../../../components/Button';

export const StyledEmailPreviewContainer = styled.div`
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  row-gap: 12px;
`;

export const StyledEmailPartPreview = styled.div`
  width: 100%;
  border-radius: 8px;
  padding: 8px;
  background-color: ${colorsPalettes.carbon[25]};
  white-space: pre-wrap;
  ${setFontVariant('body2', colorsPalettes.carbon[400])};
`;

export const StyledSeparator = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colorsPalettes.carbon[100]};
  margin: 16px 0;
`;

export const StyledCopyButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  margin-top: 12px;
  margin-left: auto;

  ${SWReactIcons} {
    margin-left: 4px;
  }
`;
