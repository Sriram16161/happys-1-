import { colorsPalettes, setFontVariant } from '@similarweb/styles';
import styled, { css } from 'styled-components';

export type Placement = 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right';

const getArrowPlacementStyles = (placement: Placement) => {
  switch (placement) {
    case 'top':
      return css`
        bottom: -15px;
        left: calc(50% - 8px);
        border-top-color: ${colorsPalettes.carbon[500]};
      `;

    case 'bottom':
      return css`
        top: -15px;
        left: calc(50% - 8px);
        border-bottom-color: ${colorsPalettes.carbon[500]};
      `;

    case 'left':
      return css`
        right: -15px;
        top: calc(50% - 8px);
        border-left-color: ${colorsPalettes.carbon[500]};
      `;

    case 'right':
      return css`
        left: -15px;
        top: calc(50% - 8px);
        border-right-color: ${colorsPalettes.carbon[500]};
      `;

    case 'top-left':
      return css`
        bottom: -15px;
        left: calc(85% - 8px);
        border-top-color: ${colorsPalettes.carbon[500]};
      `;
    case 'top-right':
      return css`
        bottom: -15px;
        left: calc(30% - 8px);
        border-top-color: ${colorsPalettes.carbon[500]};
      `;
    default:
      return '';
  }
};

const getTooltipPlacementStyles = (placement: Placement) => {
  switch (placement) {
    case 'top':
      return css`
        bottom: calc(100% + 10px);
        left: 50%;
        transform: translateX(-50%);
      `;
    case 'bottom':
      return css`
        top: calc(100% + 10px);
        left: 50%;
        transform: translateX(-50%);
      `;
    case 'left':
      return css`
        right: calc(100% + 10px);
        top: 50%;
        transform: translateY(-50%);
      `;
    case 'right':
      return css`
        left: calc(100% + 10px);
        top: 50%;
        transform: translateY(-50%);
      `;
    case 'top-left':
      return css`
        bottom: calc(100% + 10px);
        left: 50%;
        transform: translateX(-85%);
      `;
    case 'top-right':
      return css`
        bottom: calc(100% + 10px);
        left: 50%;
        transform: translateX(-30%);
      `;
    default:
      return css``;
  }
};

const getFixedTooltipPlacementStyles = (placement: Placement) => {
  switch (placement) {
    case 'top':
      return css`
        transform: translate(-50%, calc(-100% - 8px));
      `;
    default:
      return css``;
  }
};

export const TooltipContent = styled.div<{ placement: Placement; minWidth: number }>`
  position: absolute;
  background-color: ${colorsPalettes.carbon[500]};
  ${setFontVariant('tooltip', colorsPalettes.bluegrey[100])};
  padding: 8px 16px;
  border-radius: 3px;
  opacity: 0;
  z-index: 1000;
  min-width: ${({ minWidth }) => minWidth}px;

  ${({ placement }) => getTooltipPlacementStyles(placement)}

  &::after {
    content: '';
    position: absolute;
    border-style: solid;
    border-color: transparent;
    border-style: solid;
    border-width: 8px;
    ${({ placement }) => getArrowPlacementStyles(placement)}
  }
`;

export const TooltipWrapper = styled.div<{ enabled: boolean }>`
  position: relative;
  display: inline-flex;
  cursor: ${({ enabled }) => (enabled ? 'pointer' : 'default')};
`;

export const TooltipFixedWrapper = styled.div`
  position: absolute;
  right: 50%;
`;

export const TooltipFixedContent = styled.div<{ placement: Placement; minWidth: number }>`
  position: fixed;
  background-color: ${colorsPalettes.carbon[500]};
  ${setFontVariant('tooltip', colorsPalettes.bluegrey[100])};
  padding: 8px 16px;
  border-radius: 3px;
  opacity: 0;
  z-index: 1000;
  min-width: ${({ minWidth }) => minWidth}px;
  max-width: ${({ minWidth }) => minWidth}px;

  ${({ placement }) => getFixedTooltipPlacementStyles(placement)}

  &::after {
    content: '';
    position: absolute;
    border-style: solid;
    border-color: transparent;
    border-style: solid;
    border-width: 8px;
    ${({ placement }) => getArrowPlacementStyles(placement)}
  }
`;
