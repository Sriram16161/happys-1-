import styled from 'styled-components';
import { $dmSansFontFamily, colorsPalettes, setFontVariant } from '@similarweb/styles';
import { HEADER_HEIGHT } from '../components/Header/styles';
import { NAV_HEIGHT } from '../components/Tabs/styles';
import { AssetsService } from '../services/AssetsService';

export const CONTAINER_MARGIN = 14;

export const StyledExtensionContainer = styled.div`
  &::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: 70px;
    height: 53px;
    background-image: url(${AssetsService.assetUrl('/images/header-bg.png')});
    background-repeat: no-repeat;
    background-position: -23px -9px;
  }
`;

export const StyledTabsContainer = styled.div`
  height: calc(100vh - ${HEADER_HEIGHT}px);
  overflow-y: auto;
`;

export const StyledSearchContainer = styled.div`
  height: calc(100vh - ${HEADER_HEIGHT}px - ${CONTAINER_MARGIN}px);
  overflow-y: scroll;
  border-radius: 8px 8px 0px 0px;
`;

export const StyledContainer = styled.div`
  min-height: calc(100vh - ${HEADER_HEIGHT}px);
  margin: ${CONTAINER_MARGIN}px 24px 0;
  border-radius: 8px 8px 0px 0px;
  box-shadow: 0px -1px 16px 0px rgba(0, 0, 0, 0.05);
  border: 1px solid #efefef;
`;

export const StyledContainerWithNav = styled(StyledContainer)`
  min-height: calc(100vh - ${NAV_HEIGHT}px - ${HEADER_HEIGHT}px - ${CONTAINER_MARGIN}px);
`;

export const StyledContactsContainerWithNav = styled.div`
  min-height: calc(100vh - ${NAV_HEIGHT}px - ${HEADER_HEIGHT}px - ${CONTAINER_MARGIN}px);
  display: flex;
  flex-direction: column;
  margin: 0 24px;
`;

export const StyledPageHeading = styled.h1`
  font-family: ${$dmSansFontFamily};
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${colorsPalettes.carbon[500]};
  width: 100%;
  margin: 0 0 8px;
`;

export const StyledSettingsPage = styled.div`
  min-height: calc(100vh - ${HEADER_HEIGHT}px);
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const StyledSettingsHeader = styled(StyledPageHeading)`
  display: flex;
  align-items: center;
  font-size: 18px;
  margin-bottom: 24px;
`;

export const StyledArrowButton = styled.button`
  border: none;
  box-shadow: none;
  background-color: ${colorsPalettes.carbon[0]};
  cursor: pointer;
  padding: 0;
  margin-right: 5px;
`;

export const StyledSettingsTitle = styled.p`
  ${setFontVariant('input2', colorsPalettes.carbon[250])};
  font-size: 12px;
  line-height: 14px;
  margin: 8px 0;
`;
