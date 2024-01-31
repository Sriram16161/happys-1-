import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { SWReactIcons } from '@similarweb/icons';
import { Button, ButtonVariant } from '../Button';
import { Tooltip } from '../Tooltip';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import {
  StyledModalOverlay,
  StyledModal,
  StyledModalHeader,
  StyledModalHeading,
  StyledCloseModalButton,
  StyledModalFooter,
  StyledCancelButton,
} from './styles';

export type ModalButtonProps = {
  onClick?(): void;
  children?: ReactNode;
  variant?: ButtonVariant;
  'data-automation'?: string;
  disabled?: boolean;
  tooltipContent?: ReactNode;
};

export type ModalProps = {
  isOpen: boolean;
  heading?: string | null;
  onClose?(): void;
  onCloseFinish?(): void;
  children: ReactNode;
  confirmButtonProps: ModalButtonProps;
  cancelButtonProps?: ModalButtonProps;
  closeOnClickOutside?: boolean;
  footerJustifyContent?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around';
  isOverflowScroll?: boolean;
};

const animateAppearance = (element: HTMLElement, type: 'appearing' | 'disappearing') => {
  const direction = type === 'appearing' ? 'normal' : 'reverse';
  return element.animate([{ opacity: 0 }, { opacity: 1 }], {
    duration: 300,
    easing: 'ease-in-out',
    fill: 'both',
    direction,
  });
};

export const Modal = (props: ModalProps) => {
  const {
    onClose,
    confirmButtonProps,
    cancelButtonProps,
    isOpen,
    closeOnClickOutside = true,
    isOverflowScroll = false,
  } = props;
  const [internalIsOpen, setInternalIsOpen] = useState(isOpen);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current) return;

    if (!isOpen) {
      const animation = animateAppearance(overlayRef.current, 'disappearing');

      animation.onfinish = () => {
        setInternalIsOpen(false);
        props.onCloseFinish?.();
      };

      return;
    }

    setInternalIsOpen(isOpen);
    animateAppearance(overlayRef.current, 'appearing');
  }, [isOpen]);

  const shouldListen = isOpen && closeOnClickOutside;
  useOnClickOutside(modalRef, () => onClose?.(), shouldListen);

  if (!isOpen && !internalIsOpen) return null;

  return (
    <StyledModalOverlay ref={overlayRef}>
      <StyledModal ref={modalRef} isOverflowScroll={isOverflowScroll} data-automation="Modal">
        {props.heading && (
          <StyledModalHeader>
            <StyledModalHeading data-automation="ModalHeader">{props.heading}</StyledModalHeading>
            {onClose && (
              <StyledCloseModalButton data-automation="Close" onClick={onClose}>
                <SWReactIcons iconName="close" size="xs" />
              </StyledCloseModalButton>
            )}
          </StyledModalHeader>
        )}
        {props.children}
        <StyledModalFooter justifyContent={props.footerJustifyContent} data-automation="ModalFooter">
          {cancelButtonProps && (
            <Tooltip enabled={!!cancelButtonProps.tooltipContent} content={cancelButtonProps.tooltipContent}>
              <StyledCancelButton
                onClick={cancelButtonProps.onClick}
                variant={cancelButtonProps.variant}
                data-automation={cancelButtonProps['data-automation']}
                disabled={cancelButtonProps.disabled}
              >
                {cancelButtonProps.children}
              </StyledCancelButton>
            </Tooltip>
          )}

          <Tooltip enabled={!!confirmButtonProps.tooltipContent} content={confirmButtonProps.tooltipContent}>
            <Button
              onClick={confirmButtonProps.onClick}
              variant={confirmButtonProps.variant}
              data-automation={confirmButtonProps['data-automation']}
              disabled={confirmButtonProps.disabled}
            >
              {confirmButtonProps.children}
            </Button>
          </Tooltip>
        </StyledModalFooter>
      </StyledModal>
    </StyledModalOverlay>
  );
};
