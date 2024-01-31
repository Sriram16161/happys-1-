import { useEffect } from 'react';
import { useAppState } from '../AppStateProvider';
import { trackingConfig } from '../services/tracking/trackingConfig';
import TrackingPageViewService from '../services/tracking/TrackingPageViewService';
import { Page } from '../domain/page';

export const usePredefinedPageViewTracking = ({ page, isSwUser }: { page: Page; isSwUser: boolean }) => {
  const { isOpen, url } = useAppState();

  useEffect(() => {
    if (!isOpen || !url) return;
    const config = trackingConfig.find((config) => config.trackingId === page);
    TrackingPageViewService.trackPageView({ isSwUser, config, url, page });
  }, [isOpen]);
};
