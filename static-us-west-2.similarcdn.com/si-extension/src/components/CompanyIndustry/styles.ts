import styled from 'styled-components';
import { colorsPalettes, setFontVariant, truncateText } from '@similarweb/styles';
import { Tooltip } from '../Tooltip';

export const StyledIndustry = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  width: fit-content;
  max-width: 100%;
  padding: 4px;
  background-color: ${colorsPalettes.bluegrey['100']};
  border-radius: 6px;
  ${setFontVariant('primaryItem', colorsPalettes.bluegrey['500'])};
  font-size: 13px;

  & > span {
    ${truncateText()};
  }

  & > div {
    flex-shrink: 0;
  }
`;

export const StyledIndustryTooltip = styled(Tooltip)`
  width: 100%;
  :hover {
    cursor: default;
  }
`;
