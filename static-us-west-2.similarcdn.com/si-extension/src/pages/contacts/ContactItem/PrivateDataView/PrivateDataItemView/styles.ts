import styled from 'styled-components';
import { colorsPalettes, setFontVariant } from '@similarweb/styles';
import { SWReactIcons } from '@similarweb/icons';

export const StyledPrivateDataItem = styled.div<{ isUnavailable?: boolean }>`
  display: inline-flex;
  align-items: center;
  width: 100%;

  ${SWReactIcons} {
    width: 14px;
    height: 14px;
  }

  ${SWReactIcons}.direct-phone {
    width: 13px;
    height: 13px;
  }

  ${SWReactIcons}.email {
    transform: translateY(-1px);
  }

  ${SWReactIcons}.email path, ${SWReactIcons}.mobile-phone path {
    fill: ${({ isUnavailable }) => (isUnavailable ? colorsPalettes.carbon[200] : colorsPalettes.carbon[500])};
  }

  ${SWReactIcons}.direct-phone path {
    stroke: ${({ isUnavailable }) => (isUnavailable ? colorsPalettes.carbon[200] : colorsPalettes.carbon[500])};
  }

  &:not(:last-child) {
    margin-bottom: ${({ isUnavailable }) => (isUnavailable ? 0 : '8px')};
  }
`;

export const StyledPrivateDataContent = styled.p<{ increasedFontSize?: boolean; isUnavailable?: boolean }>`
  ${({ isUnavailable }) =>
    isUnavailable
      ? setFontVariant('sectionTitle', colorsPalettes.carbon[200])
      : setFontVariant('sectionTitle', colorsPalettes.carbon[300])};
  font-size: ${({ increasedFontSize }) => (increasedFontSize ? '14px' : '12px')};
  margin: 0 auto 0 12px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const StyledPrivateDataCopyButton = styled.button`
  padding: 0;
  margin-right: 8px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  ${SWReactIcons} {
    width: 14px;
    height: 14px;

    path {
      fill: ${colorsPalettes.carbon[300]};
      transition: fill 0.2s ease-in-out;
    }
  }

  &:hover ${SWReactIcons} path {
    fill: ${colorsPalettes.blue[400]};
  }
`;

export const StyledPrivateDataErrorIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: rgba(182, 190, 198, 0.2);
  }

  ${SWReactIcons} {
    width: 16px;
    height: 16px;
    path {
      fill: ${colorsPalettes.carbon[200]};
      transition: fill 0.2s ease-in-out;
    }
  }

  &:hover ${SWReactIcons} path {
    fill: ${colorsPalettes.carbon[300]};
  }
`;
