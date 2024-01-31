import styled from 'styled-components';
import { $dmSansFontFamily, colorsPalettes, setFontVariant } from '@similarweb/styles';
import { SWReactIcons } from '@similarweb/icons';

export const StyledTotalVisitsInfo = styled.div`
  ${setFontVariant('sectionTitle', colorsPalettes.carbon[400])};
  width: 100%;
  min-height: 50px;
  margin-top: 10px;
  text-align: center;
`;

export const StyledTotalVisitsInfoRow = styled.div`
  display: flex;
  align-items: baseline;
  justify-content: center;
`;

export const StyledTotalVisitsInfoBold = styled.span`
  font-family: ${$dmSansFontFamily};
  font-size: 26px;
  font-weight: 400;
  line-height: 34px;
  color: ${colorsPalettes.carbon[400]};
  margin-right: 5px;
`;

export const StyledTotalVisitsDate = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 5px;
  padding: 0 24px;
  ${setFontVariant('sectionTitle', colorsPalettes.carbon[250])};
  font-size: 10px;
`;

export const StyledArrowIcon = styled(SWReactIcons)`
  width: 12px;
  height: 12px;
  transform: translateY(2px);
`;

export const StyledChangeValue = styled.span<{ variant: 'green' | 'red' }>`
  color: ${({ variant }) => (variant === 'green' ? colorsPalettes.green.s100 : colorsPalettes.red.s100)};
  font-size: 12px;
  font-weight: 500;
  line-height: 10px;
  margin-right: 5px;
`;

export const StyledTotalVisitsChart = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
