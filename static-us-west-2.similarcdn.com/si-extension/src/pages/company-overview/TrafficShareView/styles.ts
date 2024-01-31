import styled from 'styled-components';
import { colorsPalettes, setFontVariant } from '@similarweb/styles';
import { SWReactCountryIcons, SWReactIcons } from '@similarweb/icons';
import { StyledLoadingView } from '../../../components/LoadingView/styles';
import { Button } from '../../../components/Button';

export const StyledTrafficShareTable = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 16px 0 0;
`;

export const StyledTrafficShareTableHeader = styled.header`
  ${setFontVariant('listSectionTitle', colorsPalettes.carbon[250])};
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 16px;
  width: 100%;
`;

export const StyledTrafficShareTableRow = styled.div`
  border-top: 1px solid ${colorsPalettes.carbon[25]};
  height: 47px;
  width: 100%;
  padding: 10px 12px;
  display: inline-flex;
  align-items: center;
`;

export const StyledCountryIcon = styled(SWReactCountryIcons)`
  width: 19px;
  height: 19px;
  margin-right: 8px;
`;

export const StyledTrafficShareRowName = styled.span`
  ${setFontVariant('report', colorsPalettes.carbon[400])};
`;

export const StyledTrafficShareRowValue = styled.span`
  margin-left: auto;
  ${setFontVariant('report', colorsPalettes.carbon[400])};
`;

export const SeeMoreButton = styled(Button)`
  margin: 12px 8px 0 auto;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  ${SWReactIcons} {
    margin-left: 4px;
  }
`;

export const StyledProgressBar = styled.div<{ progress: string }>`
  width: 34px;
  height: 8px;
  border-radius: 1px;
  background-color: ${colorsPalettes.carbon[50]};
  position: relative;
  margin-left: 12px;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ progress }) => progress};
    background-color: ${colorsPalettes.blue[400]};
  }
`;

export const StyledTrafficTabsContainer = styled.div`
  height: calc(100% - 82px);
  width: 100%;
`;

export const StyledTrafficLoadingView = styled.div`
  ${StyledLoadingView} {
    padding: 30px 26px;
  }
`;
