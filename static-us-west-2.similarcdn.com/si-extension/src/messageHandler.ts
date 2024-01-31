import { CollectedContactInfo, Contact } from './domain/contact';
import { CompanyTabName } from './domain/page';
import { Pagination } from './domain/pagination';
import { AUTO_OPEN_LINKEDIN_KEY } from './pages/settings/SettingsBlock';
import DataExtractionService from './services/DataExtractionService';
import { allTrackers } from './services/tracking/tracking';
import UrlService from './services/UrlService';

export type CollectedDataItem = {
  name: string;
  content: string | string[];
  attributes?: Record<string, string | string[]>;
};

export type EventData =
  | { message: 'request config' }
  | { message: 'url changed' | 'iframe loaded'; url: string; isOpen: boolean }
  | { message: 'data changed'; url: string; data: CollectedDataItem[] }
  | { message: 'set settings storage'; settingsStorage: Record<string, string | boolean | number>; url: string }
  | {
      message: 'toggle visibility';
      url: string;
      data: CollectedDataItem[];
      isOpen: boolean;
      fromBadge: boolean;
      fromToolbar: boolean;
    }
  | { message: 'drag icon' };

export type Commands = {
  setCompanyPage(params: { companyLinkedinId?: string; companyDomain?: string }): void;
  setContactPage(linkedinId?: string): void;
  setSearchPage(): void;
  setCompanyLinkedinId(linkedinId?: string): void;
  setCompanyDomain(domain: string): void;
  setContactLinkedinId(linkedinId: string): void;
  setCollectedContactInfo(contactInfo: CollectedContactInfo): void;
  setCollectedContactsSearchInfo(searchInfo: Partial<Contact>[]): void;
  setCompanyTabName(companyTabName: CompanyTabName): void;
  setHomePage(): void;
  postConfig(): void;
  setIsOpen(isOpen: boolean): void;
  setUrl(url: string): void;
  setSettingsStorageValue(keyValue: Record<string, string | boolean | number>): void;
  getSettingsStorageValue(key: string): string | boolean | number | undefined;
  setSearchPagePagination(pagination: Pagination): void;
};

export const makeMessageHandler = (commands: Commands) => {
  return (event: EventData) => {
    if (event.message === 'request config') commands.postConfig();

    if (event.message === 'drag icon') {
      allTrackers.dispatchTrackEvent('floating icon', 'drag icon', 'floating icon location');
    }

    if (event.message === 'toggle visibility') {
      if (event.fromBadge && event.isOpen) {
        allTrackers.dispatchTrackEvent('floating icon', 'expand', 'open extension/floating icon');
      }

      if (event.fromToolbar) {
        if (event.isOpen) {
          allTrackers.dispatchTrackEvent('chrome bar', 'expand', 'open extension/toolbar');
        } else {
          allTrackers.dispatchTrackEvent('extension top actions', 'collapse', 'close extension/toolbar');
        }
      }
      commands.setIsOpen(event.isOpen);
    }

    if (event.message === 'set settings storage') {
      commands.setSettingsStorageValue(event.settingsStorage);
      const isAutoOpenEnabled =
        event.settingsStorage &&
        (event.settingsStorage[AUTO_OPEN_LINKEDIN_KEY] ||
          event.settingsStorage[AUTO_OPEN_LINKEDIN_KEY] === 'undefined');
      if (isAutoOpenEnabled) {
        commands.setSettingsStorageValue({ [AUTO_OPEN_LINKEDIN_KEY]: true });
        const url = UrlService.createEventUrl(event.url);
        if (UrlService.isLinkedinUrl(url) && UrlService.isAutoOpenLinkedinPage(url)) {
          window.parent.postMessage({ message: 'open' }, '*');
        }
      }
    }

    if (event.message === 'url changed') {
      const url = UrlService.createEventUrl(event.url);
      const isAutoOpenEnabled = commands.getSettingsStorageValue(AUTO_OPEN_LINKEDIN_KEY);

      if (UrlService.isLinkedinUrl(url) && UrlService.isAutoOpenLinkedinPage(url) && isAutoOpenEnabled) {
        window.parent.postMessage({ message: 'open' }, '*');
      }
    }

    if (event.message === 'iframe loaded' || event.message === 'url changed') {
      const url = UrlService.createEventUrl(event.url);
      commands.setUrl(event.url);

      if (UrlService.isLinkedinUrl(url)) {
        if (UrlService.isCompanyPage(url)) {
          const companyLinkedinId = UrlService.getCompanyLinkedinIdFromUrl(url);
          if (companyLinkedinId) commands.setCompanyPage({ companyLinkedinId });
          if (UrlService.isCompanyPeoplePage(url)) commands.setCompanyTabName(CompanyTabName.Contacts);
        } else if (UrlService.isContactPage(url)) {
          const linkedinId = UrlService.getContactLinkedinIdFromUrl(url);
          if (linkedinId) commands.setContactPage(linkedinId);
        } else if (
          UrlService.isSearchPage(url) ||
          UrlService.isSalesNavSearchPage(url) ||
          UrlService.isSearchAllPage(url) ||
          UrlService.isSalesNavListPage(url)
        ) {
          commands.setSearchPage();
        } else if (UrlService.isSalesNavContactPage(url)) {
          commands.setContactPage();
        } else if (UrlService.isSalesNavCompanyPage(url)) {
          const companyLinkedinId = UrlService.getCompanyLinkedinIdFromSalesNavPathname(url.pathname);
          if (companyLinkedinId) commands.setCompanyPage({ companyLinkedinId });
        } else {
          commands.setHomePage();
        }
      } else {
        const companyDomain = UrlService.removeWWW(url.hostname);
        commands.setCompanyPage({ companyDomain });
      }
    }

    if (event.message === 'data changed') {
      if (!event.url) return;

      const url = UrlService.createEventUrl(event.url);
      if (!UrlService.isLinkedinUrl(url)) return;

      if (UrlService.isCompanyPage(url)) {
        const companyDomain = DataExtractionService.extractCompanyDomain(event.data);
        if (companyDomain) commands.setCompanyDomain(companyDomain);
      }

      if (UrlService.isContactPage(url)) {
        const contactInfo = DataExtractionService.extractContactInfoFromLinkedin(event.data);
        commands.setCompanyLinkedinId(contactInfo.companyLinkedinIds?.[0]);
        commands.setCollectedContactInfo(contactInfo);
      }

      if (UrlService.isSearchPage(url)) {
        const searchInfo = DataExtractionService.extractContactSearchInfo(event.data);
        commands.setCollectedContactsSearchInfo(searchInfo);
      }

      if (UrlService.isSearchAllPage(url)) {
        const searchInfo = DataExtractionService.extractAllSearchInfo(event.data);
        commands.setCollectedContactsSearchInfo(searchInfo);
      }

      if (UrlService.isSalesNavContactPage(url)) {
        const contactInfo = DataExtractionService.extractContactInfoFromSalesNav(event.data);
        commands.setCollectedContactInfo(contactInfo);
        commands.setCompanyLinkedinId(contactInfo.companyLinkedinIds?.[0]);
        const contactLinkedinId = DataExtractionService.extractContactLinkedinId(event.data);
        if (contactLinkedinId) commands.setContactLinkedinId(contactLinkedinId);
      }

      if (UrlService.isSalesNavCompanyPage(url)) {
        const companyDomain = DataExtractionService.extractCompanyDomain(event.data);
        if (companyDomain) commands.setCompanyDomain(companyDomain);
      }

      if (UrlService.isSalesNavSearchPage(url)) {
        const page = UrlService.getPageFromUrl(url);
        const total = DataExtractionService.extractResultsCount(event.data);
        const pageSize = 25;
        commands.setSearchPagePagination({ page, total, pageSize });

        const searchInfo = DataExtractionService.extractContactSearchInfoFromSalesNav(event.data);
        commands.setCollectedContactsSearchInfo(searchInfo);
      }

      if (UrlService.isSalesNavListPage(url)) {
        const searchInfo = DataExtractionService.extractContactSearchInfoFromSalesNav(event.data, true);
        commands.setCollectedContactsSearchInfo(searchInfo);
      }
    }
  };
};
