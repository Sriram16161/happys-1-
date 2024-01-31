import styled, { css } from 'styled-components';
import { colorsPalettes, setFontVariant } from '@similarweb/styles';
import { SWReactIcons } from '@similarweb/icons';
import { Button } from '../Button';

const MODAL_OVERLAY_PADDING = 16;

export const StyledModalOverlay = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100vw;
  height: 100vh;
  background-color: rgba(67, 89, 147, 0.7);
  padding: ${MODAL_OVERLAY_PADDING}px;
  left: 0;
  top: 0;
  z-index: 10;
`;

export const StyledModal = styled.div<{ isOverflowScroll: boolean }>`
  padding: 16px;
  border-radius: 4px;
  flex-grow: 1;
  box-shadow: 0px 15px 12px rgba(0, 0, 0, 0.22), 0px 19px 38px rgba(0, 0, 0, 0.3);
  background-color: ${colorsPalettes.carbon[0]};
  display: flex;
  flex-wrap: wrap;

  ${({ isOverflowScroll }) => {
    if (isOverflowScroll)
      return css`
        max-height: calc(100vh - ${MODAL_OVERLAY_PADDING * 2}px);
        overflow: auto;
      `;
  }}
`;

export const StyledModalHeader = styled.header`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

export const StyledModalHeading = styled.h4`
  ${setFontVariant('h5', colorsPalettes.carbon[500])};
  margin: 0;
`;

export const StyledCloseModalButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 8px;
  border: none;
  box-shadow: none;
  background-color: ${colorsPalettes.carbon[0]};
  transition: background-color 0.2s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: rgba(181, 190, 198, 0.2);
  }

  ${SWReactIcons} {
    width: 14px;
    height: 14px;

    svg path {
      fill: ${colorsPalettes.carbon[250]};
    }
  }
`;

export const StyledModalFooter = styled.div<{ justifyContent?: string }>`
  display: flex;
  justify-content: ${({ justifyContent }) => justifyContent || 'flex-end'};
  width: 100%;
  margin-top: 20px;
`;

export const StyledCancelButton = styled(Button)`
  margin-right: 8px;
`;
