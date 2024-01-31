import { setFontVariant, colorsPalettes } from '@similarweb/styles';
import styled from 'styled-components';
import { Tooltip } from '../../../../components/Tooltip';
import { TooltipContent } from '../../../../components/Tooltip/styles';

export const StyledTooltip = styled(Tooltip)`
  flex-grow: 1;

  ${TooltipContent} {
    min-width: 200px;
  }
`;

export const StylePersonaField = styled.div`
  width: 100%;
`;

export const StyledPersonaFieldName = styled.span`
  ${setFontVariant('listItem4', colorsPalettes.carbon[0])};
  margin-right: 4px;
`;

export const StyledPersonaFieldValue = styled.span`
  ${setFontVariant('tooltip', colorsPalettes.carbon[0])};
`;
