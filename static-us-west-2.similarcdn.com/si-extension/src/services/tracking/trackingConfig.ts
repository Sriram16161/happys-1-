import { CompanyTabName, Page } from '../../domain/page';

export type TrackingConfigItem = {
  trackingId: Page | CompanyTabName;
  subSection: string;
  subSubSection: string;
};

export const trackingConfig: TrackingConfigItem[] = [
  { trackingId: CompanyTabName.Overview, subSection: 'overview', subSubSection: 'company overview' },
  { trackingId: CompanyTabName.Insights, subSection: 'insights', subSubSection: 'insights' },
  { trackingId: CompanyTabName.Contacts, subSection: 'contacts', subSubSection: 'contacts page' },
  { trackingId: Page.Company, subSection: 'overview', subSubSection: 'company overview' },
  { trackingId: Page.Contact, subSection: 'overview', subSubSection: 'person overview' },
  { trackingId: Page.Search, subSection: 'contacts', subSubSection: 'search results' },
  { trackingId: Page.Home, subSection: 'not supported page', subSubSection: 'not supported page' },
  { trackingId: Page.Login, subSection: 'login', subSubSection: 'login home' },
  { trackingId: Page.Terms, subSection: 'login', subSubSection: 'terms and conditions' },
  { trackingId: Page.NoAccess, subSection: 'login', subSubSection: 'no access' },
];
