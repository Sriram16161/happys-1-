import styled from 'styled-components';
import { colorsPalettes, setFontVariant } from '@similarweb/styles';
import { SWReactIcons } from '@similarweb/icons';

const CONTAINER_MARGIN = 24;

export const StyledImpersonateContainer = styled.div`
  z-index: 1;
  position: fixed;
  bottom: 24px;
  display: flex;
  width: calc(100% - (2 * ${CONTAINER_MARGIN}px));
  min-height: 86px;
  margin: 0 ${CONTAINER_MARGIN}px;
  padding: 14px;
  border-radius: 8px;
  border: 2px solid ${colorsPalettes.red[400]};
  background-color: ${colorsPalettes.red[200]};
  box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.24);
`;

export const StyledImpersonateInfo = styled.div`
  max-width: calc(100% - 32px);
  padding-left: 8px;
`;

export const StyledImpersonateIcon = styled(SWReactIcons)`
  flex: none;
`;

export const StyledImpersonateText = styled.div`
  margin: 0;
  ${setFontVariant('input2', colorsPalettes.carbon[400])};
  line-height: 18px;
  word-break: break-word;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const StyledImpersonateTextBold = styled.span`
  ${setFontVariant('input2', colorsPalettes.carbon[400])};
  line-height: 18px;
  font-weight: 700;
`;
