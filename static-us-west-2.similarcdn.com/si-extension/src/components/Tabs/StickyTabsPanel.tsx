import React, { useRef } from 'react';
import { useAppState } from '../../AppStateProvider';
import { useObserveIntersection } from '../../hooks/useObserveIntersection';
import { TabsPanelProps } from './TabsPanel';
import { useTabsPanel } from './useTabsPanel';
import { StyledStickyTabsPanel, StyledActiveTabIndicator, StyledTabButton, StyledTabIcon } from './styles';

export const StickyTabsPanel = <T extends string | number>(props: TabsPanelProps<T>) => {
  const { variant = 'regular', tabs, activeTabName, tabsPosition = 'bottom', onSelect } = props;
  const { isOpen } = useAppState();
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLSpanElement[]>([]);

  const { indicatorWidth, indicatorLeft, buttonWidth } = useTabsPanel({
    tabs,
    activeTabName,
    panelRef,
    buttonsRef,
  });

  useObserveIntersection({
    observerRootId: 'si-extension-tabs',
    sentinelSelector: '#si-extension-nav',
    shouldObserve: isOpen,
    onIntersection: ([entry]) => panelRef?.current?.classList.toggle('isUnSticky', entry.intersectionRatio < 1),
    threshold: [0, 1],
    rootMargin: '-1px 0px 0px 0px',
  });

  return (
    <StyledStickyTabsPanel ref={panelRef} variant={variant} id="si-extension-nav">
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
            <span ref={(element: HTMLSpanElement) => buttonsRef.current.push(element)}>{tab.label}</span>
          </StyledTabButton>
        );
      })}
    </StyledStickyTabsPanel>
  );
};
