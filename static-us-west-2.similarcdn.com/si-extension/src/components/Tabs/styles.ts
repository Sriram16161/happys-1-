import { ComponentType } from 'react';
import { SWReactIconProps, SWReactIcons } from '@similarweb/icons';
import styled, { css } from 'styled-components';
import { colorsPalettes, setFontVariant } from '@similarweb/styles';
import { TabsVariant } from './Tabs';

export const NAV_HEIGHT = 60;

export const StyledTabsContainer = styled.div`
  width: 100%;
`;

export const StyledTabsPanel = styled.div<{ variant: TabsVariant }>`
  width: 100%;
  display: flex;
  height: ${({ variant }) => (variant === 'compact' ? '48px' : `${NAV_HEIGHT}px`)};
  position: relative;
`;

export const StyledStickyTabsPanel = styled(StyledTabsPanel)`
  position: sticky;
  top: 0;
  z-index: 1;
  box-shadow: 0px 1px 6px 0px #0e1e3e1a;

  &.isUnSticky {
    box-shadow: unset;
  }
`;

export const StyledTabIcon = styled<
  ComponentType<SWReactIconProps & { isActive: boolean; fillMethod: 'stroke' | 'fill'; width?: number }>
>(SWReactIcons)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 30px;
  svg path,
  svg circle {
    ${({ isActive, fillMethod }) =>
      `${fillMethod}: ${isActive ? colorsPalettes.blue[400] : colorsPalettes.carbon[400]};`}
    transition: fill 0.25s ease-in-out;
  }
  ${({ width }) =>
    width &&
    css`
      width: ${width}px;
    `}
`;

export const StyledTabButton = styled.button<{
  isActive: boolean;
  position: 'top' | 'bottom';
  variant: TabsVariant;
  width: number;
}>`
  flex-grow: 1;
  border: none;
  box-shadow: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: ${({ width }) => `${width}px`};
  ${({ isActive: active }) =>
    setFontVariant('sectionTitle', active ? colorsPalettes.blue[400] : colorsPalettes.carbon[400])};
  ${({ variant }) => (variant === 'compact' ? 'font-size: 14px' : 'font-size: 12px')};
  font-weight: 400;
  cursor: pointer;
  background-color: ${colorsPalettes.carbon[0]};
  outline: none;
  transition: color 0.25s ease-in-out;
  ${({ position, variant }) =>
    variant !== 'sticky' && `border-${position === 'top' ? 'bottom' : 'top'}: 1px solid ${colorsPalettes.carbon[50]}`};
`;

export const StyledTabViewContainer = styled.div`
  flex-grow: 1;
`;

export const StyledActiveTabIndicator = styled.div<{ left: number; width: number; position: 'top' | 'bottom' }>`
  position: absolute;
  left: ${({ left }) => `${left}px`};
  width: ${({ width }) => `${width}px`};
  height: 2px;
  background-color: ${colorsPalettes.blue[400]};
  transition: left 0.25s ease-in-out;
  ${({ position }) => `${position}: calc(100% - 1px)`};
`;
