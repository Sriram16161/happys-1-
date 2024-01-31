import styled from 'styled-components';
import { colorsPalettes, setFontVariant } from '@similarweb/styles';

export const StyledMetricsContainer = styled.div`
  margin-top: 16px;
`;

export const StyledMetric = styled.div<{ withIcon?: boolean }>`
  width: 100%;
  border-top: 1px solid ${colorsPalettes.carbon[50]};
  padding: ${({ withIcon }) => (withIcon ? '8px 0' : '8px 0 8px 16px')};
  display: inline-flex;
  align-items: center;
`;

export const StyledMetricName = styled.span`
  ${setFontVariant('report', colorsPalettes.carbon[400])};
  line-height: 18px;
  margin-right: auto;
`;

export const StyledMetricValue = styled.span`
  ${setFontVariant('report', colorsPalettes.carbon[400])};
  line-height: 18px;
  margin-left: 8px;
`;
