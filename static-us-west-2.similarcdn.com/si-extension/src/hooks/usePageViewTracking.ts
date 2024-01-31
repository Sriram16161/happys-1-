import { useEffect } from 'react';
import { useAppState } from '../AppStateProvider';
import { trackingConfig } from '../services/tracking/trackingConfig';
import TrackingPageViewService from '../services/tracking/TrackingPageViewService';
import UrlService from '../services/UrlService';
import { useIsSwUser } from './useIsSwUser';
import { usePrevious } from './usePrevious';

export const usePageViewTracking = () => {
  const { page, isOpen, url, companyTabName } = useAppState();
  const isSwUser = useIsSwUser();
  const prevUrl = usePrevious(url);
  const prevCompanyTabName = usePrevious(companyTabName);

  useEffect(() => {
    if (!isOpen || !url) return;
    let config = trackingConfig.find((config) => config.trackingId === page);
    const urlObject = UrlService.createEventUrl(url);

    if (prevUrl !== url) {
      if (UrlService.isLinkedinUrl(urlObject)) {
        TrackingPageViewService.trackPageView({ config, url, page, isSwUser });
        return;
      } else if (prevUrl && new URL(prevUrl).hostname === urlObject.hostname) return;
    }

    if (prevCompanyTabName !== companyTabName) {
      config = trackingConfig.find((config) => config.trackingId === companyTabName);
    }
    TrackingPageViewService.trackPageView({ config, url, page, isSwUser });
  }, [page, isOpen, companyTabName, url]);
};
