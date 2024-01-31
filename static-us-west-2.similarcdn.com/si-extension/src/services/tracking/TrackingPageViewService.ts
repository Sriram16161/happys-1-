import { ICustomDimensionPath } from '@similarweb/sw-track';
import { Page } from '../../domain/page';
import UrlService from '../UrlService';
import { allTrackers } from './tracking';
import { TrackingConfigItem } from './trackingConfig';

const createTrackingPageViewService = () => {
  const getPageLocation = (url?: string) => {
    if (!url) return '';
    const urlObject = UrlService.createEventUrl(url);
    let location = 'see on linkedin';
    if (!UrlService.isLinkedinUrl(urlObject)) {
      location = 'see on company website';
    } else if (UrlService.isSalesNavPage(urlObject)) {
      location = 'see on sales navigator';
    }
    return location;
  };

  const trackPageView = ({
    isSwUser,
    config,
    url,
    page,
  }: {
    isSwUser: boolean;
    config: TrackingConfigItem | undefined;
    url: string;
    page: Page;
  }) => {
    if (!config) return;
    const path: ICustomDimensionPath = {
      page_id: page,
      section: 'si extension',
      sub_section: config.subSection,
      sub_sub_section: config.subSubSection,
    };
    allTrackers.trackPageView({
      path,
      is_sw_user: isSwUser,
      lang: 'en',
      custom_data: { action: getPageLocation(url), event_name: url },
    });
  };

  return {
    trackPageView,
    getPageLocation,
  };
};

const TrackingPageViewService = createTrackingPageViewService();

export default TrackingPageViewService;
