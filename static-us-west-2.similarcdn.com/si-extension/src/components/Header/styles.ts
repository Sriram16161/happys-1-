import styled from 'styled-components';
import { colorsPalettes, $dmSansFontFamily } from '@similarweb/styles';
import { SWReactIcons } from '@similarweb/icons';
import { TooltipContent } from '../Tooltip/styles';
import { Tooltip } from '../Tooltip';

export const HEADER_HEIGHT = 46;

export const StyledHeader = styled.header`
  padding: 13px 12px 13px 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-content: flex-start;
  height: ${HEADER_HEIGHT}px;
  border-bottom: 1px solid #f0f0f0;
`;

export const StyledCredits = styled.span`
  margin: 0 2px 0 0;
  color: ${colorsPalettes.carbon[300]};
  font-family: ${$dmSansFontFamily};
  font-weight: 400;
  font-size: 12px;
  line-height: 20px;
`;

export const StyledCreditsValue = styled.span`
  margin-right: 8px;
  color: ${colorsPalettes.carbon[400]};
  font-family: ${$dmSansFontFamily};
  font-weight: 500;
  font-size: 12px;
  line-height: 20px;
`;

export const StyledLogoImage = styled.div`
  margin-right: auto;
  width: 100px;
  height: 18px;
`;

export const StyledTooltip = styled(Tooltip)`
  & ${TooltipContent} {
    min-width: 145px;
    text-align: center;
  }
`;

export const StyledSettingsButton = styled.button<{ isDisabled: boolean }>`
  border: none;
  box-shadow: none;
  background-color: ${colorsPalettes.carbon[0]};
  cursor: ${({ isDisabled }) => (isDisabled ? 'unset' : 'pointer')};
  padding: 0;
  margin-right: 4px;

  ${SWReactIcons} svg path {
    fill: ${colorsPalettes.carbon[300]};
  }
`;
