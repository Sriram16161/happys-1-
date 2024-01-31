import styled, { css } from 'styled-components';
import { colorsPalettes, setFontVariant } from '@similarweb/styles';
import { SWReactIcons } from '@similarweb/icons';
import { NoDataViewVariant } from './NoDataView';

export const StyledNoDataContainer = styled.div<{ variant: NoDataViewVariant }>`
  width: 100%;
  margin: ${({ variant }) => (variant === NoDataViewVariant.monthlyVisits ? '16px 0px 32px' : '32px 0')};
`;

export const StyledNoDataTitle = styled.p`
  margin: 16px 0 0;
  ${setFontVariant('report', colorsPalettes.carbon[500])};
  line-height: 20px;
  text-align: center;
`;

export const StyledNoDataSubtitle = styled.p`
  ${setFontVariant('sectionTitle', colorsPalettes.carbon[300])};
  line-height: 20px;
  margin: 0;
  text-align: center;
`;

export const StyledNoDataIcon = styled(SWReactIcons)<{ variant: NoDataViewVariant }>`
  margin: 0 auto;

  ${({ variant }) => {
    switch (variant) {
      case NoDataViewVariant.monthlyVisits:
        return css`
          width: 132px;
          height: auto;
        `;
      case NoDataViewVariant.trafficShare:
        return css`
          width: 142px;
          height: auto;
        `;
    }
  }}
`;
