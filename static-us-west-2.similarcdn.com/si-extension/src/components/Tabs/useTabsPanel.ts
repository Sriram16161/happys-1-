import { useLayoutEffect, useState, RefObject, MutableRefObject } from 'react';
import { Tab } from './Tab';

type UseTabsPanelProps<T extends string | number> = {
  tabs: Tab<T>[];
  activeTabName: T;
  panelRef: RefObject<HTMLDivElement>;
  buttonsRef?: MutableRefObject<HTMLSpanElement[]>;
};

type UseTabsPanelReturnProps = {
  indicatorWidth: number;
  indicatorLeft: number;
  buttonWidth: number;
};

const DEFAULT_EXTENSION_WIDTH = 340;

export const useTabsPanel = <T extends string | number>(props: UseTabsPanelProps<T>): UseTabsPanelReturnProps => {
  const { tabs, activeTabName, panelRef, buttonsRef } = props;
  const defaultButtonWidth = DEFAULT_EXTENSION_WIDTH / tabs.length;
  const [indicatorWidth, setIndicatorWidth] = useState(0);
  const [indicatorLeft, setIndicatorLeft] = useState(0);
  const [buttonWidth, setButtonWidth] = useState(defaultButtonWidth);

  useLayoutEffect(() => {
    let width, left;
    const activeTabIndex = tabs.findIndex((tab) => tab.name === activeTabName);
    const buttonWidth = panelRef.current?.clientWidth ? panelRef.current.clientWidth / tabs.length : defaultButtonWidth;

    if (buttonsRef?.current) {
      width = buttonsRef.current?.[activeTabIndex].offsetWidth || 0;
      left = activeTabIndex * buttonWidth + (buttonWidth - width) / 2;
    } else {
      width = buttonWidth;
      left = activeTabIndex * width;
    }
    setIndicatorWidth(width);
    setIndicatorLeft(left);
    setButtonWidth(buttonWidth);
  }, [activeTabName]);

  return { indicatorWidth, indicatorLeft, buttonWidth };
};
