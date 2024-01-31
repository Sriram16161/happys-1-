import React, { useEffect, useRef } from 'react';
import { SWReactIcons } from '@similarweb/icons';
import { useAppState } from '../../AppStateProvider';
import { appStore } from '../../services/appStore';
import { ToastView, ToastContent } from './styles';

const DEFAULT_TIMEOUT = 3000;

export const ToastProvider = () => {
  const { toast } = useAppState();
  const toastElRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!toast) return;

    const timeout = setTimeout(() => {
      appStore.setToast(undefined);
    }, toast.timeout ?? DEFAULT_TIMEOUT);

    return () => clearTimeout(timeout);
  }, [toast]);

  if (!toast) return null;

  return (
    <ToastView ref={toastElRef} isInfoIcon={toast.icon === 'info'}>
      {toast.icon && <SWReactIcons iconName={toast.icon} size="xs" />}
      <ToastContent>{toast.content}</ToastContent>
    </ToastView>
  );
};
