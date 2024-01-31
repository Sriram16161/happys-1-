import React, { useRef } from 'react';
import { Tab } from './Tab';
import { useTabsPanel } from './useTabsPanel';
import { StyledTabsPanel, StyledActiveTabIndicator, StyledTabButton, StyledTabIcon } from './styles';
import { TabsVariant } from './Tabs';

export type TabsPanelProps<T extends string | number> = {
  tabs: Tab<T>[];
  variant?: TabsVariant;
  activeTabName: T;
  tabsPosition?: 'top' | 'bottom';
  onSelect(tabName: T): void;
};

export const TabsPanel = <T extends string | number>(props: TabsPanelProps<T>) => {
  const { variant = 'regular', tabs, activeTabName, tabsPosition = 'bottom', onSelect } = props;
  const panelRef = useRef<HTMLDivElement>(null);

  const { indicatorWidth, indicatorLeft, buttonWidth } = useTabsPanel({
    tabs,
    activeTabName,
    panelRef,
  });

  return (
    <StyledTabsPanel ref={panelRef} variant={variant}>
      <StyledActiveTabIndicator left={indicatorLeft} width={indicatorWidth} position={tabsPosition} />
      {tabs.map((tab) => {
        const isActive = tab.name === activeTabName;

        return (
          <StyledTabButton
            data-automation={tab.name}
            key={tab.name}
            onClick={() => onSelect(tab.name)}
            type="button"
            isActive={isActive}
            position={tabsPosition}
            variant={variant}
            width={buttonWidth}
          >
            {tab.iconProps && (
              <StyledTabIcon
                size="sm"
                {...tab.iconProps}
                isActive={isActive}
                fillMethod={tab.iconProps.colorMethod || 'fill'}
              />
            )}
            {tab.label}
          </StyledTabButton>
        );
      })}
    </StyledTabsPanel>
  );
};
