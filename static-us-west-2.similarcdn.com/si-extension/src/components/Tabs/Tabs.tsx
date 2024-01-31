import React, { useMemo } from 'react';
import { StickyTabsPanel } from './StickyTabsPanel';
import { StyledTabsContainer, StyledTabViewContainer } from './styles';
import { Tab } from './Tab';
import { TabsPanel } from './TabsPanel';

export type TabsVariant = 'regular' | 'compact' | 'sticky';

export type TabsViewProps<T> = {
  tabs: Tab<T>[];
  onSelect(tabName: T): void;
  activeTabName: T;
  tabsPosition?: 'top' | 'bottom';
  variant?: TabsVariant;
};

export const TabsView = <T extends string | number>(props: TabsViewProps<T>) => {
  const { tabs, activeTabName, tabsPosition = 'bottom', variant = 'regular' } = props;

  const ActiveTabView = useMemo(() => tabs.find((tab) => tab.name === activeTabName)?.component, [activeTabName, tabs]);

  const TabsPanelView = variant === 'sticky' ? StickyTabsPanel : TabsPanel;

  return (
    <StyledTabsContainer data-automation="Tabs" id="si-extension-tabs">
      {tabsPosition === 'top' && <TabsPanelView {...props} />}

      <StyledTabViewContainer>{ActiveTabView && <ActiveTabView />}</StyledTabViewContainer>

      {tabsPosition === 'bottom' && <TabsPanelView {...props} />}
    </StyledTabsContainer>
  );
};
