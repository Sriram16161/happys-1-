import React, { useEffect, useRef, useState, ReactNode, ChangeEvent, useCallback } from 'react';
import { SWReactIcons } from '@similarweb/icons';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { StyledDropdownContainer, StyledSearchField, StyledSearchInput, StyledSeparator } from './styles';
import { DotsLoader } from '../DotsLoader/DotsLoader';

const animateAppearance = (element: HTMLElement, type: 'appearing' | 'disappearing'): Animation => {
  const keyframes = type === 'appearing' ? [{ opacity: 0 }, { opacity: 1 }] : [{ opacity: 1 }, { opacity: 0 }];
  return element.animate(keyframes, { duration: 400, easing: 'ease-out', fill: 'forwards' });
};

export type Placement = 'left' | 'right';

export type DropdownProps = {
  children: ReactNode;
  isOpened: boolean;
  onClose(): void;
  onCloseFinish?(): void;
  className?: string;
  searchProps?: {
    value: string;
    onChange(event: ChangeEvent<HTMLInputElement>): void;
    placeholder?: string;
    isLoading?: boolean;
  };
  placement?: Placement;
  minWidth?: number | string;
  maxHeight?: number;
};

export const Dropdown = ({
  children,
  onClose,
  isOpened,
  searchProps,
  onCloseFinish,
  className,
  placement = 'left',
  minWidth,
  maxHeight,
}: DropdownProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [internalIsOpened, setInternalIsOpened] = useState(isOpened);

  const handleClickOutside = useCallback(
    (event: MouseEvent | KeyboardEvent) => {
      onClose();
      event.stopPropagation();
    },
    [onClose]
  );

  useOnClickOutside(containerRef, handleClickOutside, isOpened);

  useEffect(() => {
    if (!containerRef.current) return;

    if (isOpened) {
      animateAppearance(containerRef.current, 'appearing');
      setInternalIsOpened(true);
      return;
    }

    const animation = animateAppearance(containerRef.current, 'disappearing');
    animation.onfinish = () => {
      setInternalIsOpened(false);
      onCloseFinish?.();
    };
  }, [isOpened]);

  if (!isOpened && !internalIsOpened) return null;

  return (
    <StyledDropdownContainer
      data-automation="Dropdown"
      ref={containerRef}
      className={className}
      placement={placement}
      minWidth={minWidth}
      maxHeight={maxHeight}
    >
      {searchProps && (
        <>
          <StyledSearchField>
            <SWReactIcons iconName="search" size="sm" />
            <StyledSearchInput type="text" {...searchProps} />
            {searchProps.isLoading && <DotsLoader />}
          </StyledSearchField>
          <StyledSeparator />
        </>
      )}
      {children}
    </StyledDropdownContainer>
  );
};
