import styled, { css } from 'styled-components';
import { colorsPalettes, setFontVariant } from '@similarweb/styles';
import { SWReactIcons } from '@similarweb/icons';

export const StyledCompanyInfoItem = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  margin-bottom: 16px;
  width: 100%;

  ${SWReactIcons} {
    svg path {
      fill-opacity: 1;
    }
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const StyledCompanyInfoItemLabel = styled.div`
  ${setFontVariant('primaryItem', colorsPalettes.carbon[300])};
  font-size: 12px;
  font-weight: 400;
`;

export const StyledCompanyInfoItemValue = styled.div<{ clickable?: boolean }>`
  ${setFontVariant('subsectionTitle', colorsPalettes.carbon[500])};
  font-weight: 400;
  font-size: 14px;
  line-height: 16px;
  width: 100%;
  margin-top: 4px;
  ${({ clickable }) =>
    clickable &&
    css`
      cursor: pointer;
      color: ${colorsPalettes.blue[400]};
    `}
`;
