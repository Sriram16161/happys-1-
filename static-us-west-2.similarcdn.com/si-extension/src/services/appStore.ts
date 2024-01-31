import { domainIgnoreList } from '../domain/company';
import { CollectedContactInfo, Contact, ContactDetail, ContactStatusFilterValue } from '../domain/contact';
import { Country } from '../domain/country';
import { CompanyTabName, Page } from '../domain/page';
import { Pagination } from '../domain/pagination';
import { Persona } from '../domain/persona';
import { Toast } from '../domain/toast';
import { getExtensionVersion } from './browser';
import { isVersionHigher } from './checkVersion';

export type AppState = {
  isOpen: boolean;
  url?: string;
  companyLinkedinId?: string;
  toast?: Toast;
  page: Page;
  prevPage?: Page;
  contactLinkedinId?: string;
  companyDomain?: string;
  collectedContactInfo?: CollectedContactInfo;
  collectedContactsSearchInfo?: Partial<Contact>[];
  searchPagePagination: Pagination;
  contactFilters: {
    searchText: string;
    persona?: Persona;
    includeCountries: Country[];
    contactDetails: ContactDetail | null;
    status: ContactStatusFilterValue;
  };
  companyTabName: CompanyTabName;
  notRevealedContactsIds: string[];
  settingsStorage: Record<string, string | boolean | number> & {
    hasApprovedTerms?: boolean;
    isCustomUiVersion?: boolean;
    isEmailGenerationEnabled?: boolean;
  };
};
export type Listener = () => void;
export type Unsubscribe = () => void;

export type AppStore = {
  subscribe(listener: Listener): Unsubscribe;
  getState(): AppState;
  setUrl(url: string): void;
  setToast(toast: Toast | undefined): void;
  setCompanyLinkedinId(companyLinkedinId?: string): void;
  setCompanyDomain(domain: string): void;
  setCompanyPage(params: { companyDomain?: string; companyLinkedinId?: string }): void;
  setContactLinkedinId(contactLinkedinId?: string): void;
  setContactPage(contactLinkedinId?: string): void;
  setSearchPage(): void;
  setSettingsPage(): void;
  resetSettingsPage(): void;
  setCollectedContactInfo(info: CollectedContactInfo): void;
  setCollectedContactsSearchInfo(searchInfo: Partial<Contact>[]): void;
  setContactsSearchText(searchText: string): void;
  setContactsPersona(persona: Persona | undefined): void;
  setContactsIncludeCountries(includeCountries: Country[]): void;
  setContactsDetails(contactDetails: ContactDetail | null): void;
  setContactsStatusFilterValue(status: ContactStatusFilterValue): void;
  setHomePage(): void;
  setIsOpen(isOpen: boolean): void;
  setCompanyTabName(companyTabName: CompanyTabName): void;
  addNotRevealedContactId(contactId: string): void;
  getSettingsStorageValue(key: string): string | boolean | number | undefined;
  setSettingsStorageValue(keyValue: Record<string, string | boolean | number>): void;
  setSearchPagePagination(pagination: Pagination): void;
};

const OPEN_BY_DEFAULT_UNTIL_VERSION = '0.0.4';

export const initialState: AppState = {
  page: Page.Home,
  contactFilters: { searchText: '', includeCountries: [], contactDetails: null, status: {} },
  isOpen: isVersionHigher(getExtensionVersion(), OPEN_BY_DEFAULT_UNTIL_VERSION) ? false : true,
  companyTabName: CompanyTabName.Overview,
  notRevealedContactsIds: [],
  settingsStorage: {},
  searchPagePagination: { pageSize: 25, page: 1, total: 0 },
};

const makeAppStore = (): AppStore => {
  let listeners: Listener[] = [];
  let appState = initialState;
  const emitChange = () => listeners.forEach((l) => l());

  return {
    subscribe: (listener: Listener): Unsubscribe => {
      listeners = listeners.concat(listener);
      return () => {
        listeners = listeners.filter((l) => l !== listener);
      };
    },

    getState: () => appState,

    setUrl: (url: string) => {
      if (appState.url === url) return;
      appState = { ...appState, url };
      emitChange();
    },

    setIsOpen: (isOpen: boolean): void => {
      appState = { ...appState, isOpen };
      emitChange();
    },

    setToast: (toast: Toast | undefined) => {
      appState = { ...appState, toast };
      emitChange();
    },

    setCompanyLinkedinId(companyLinkedinId?: string): void {
      if (appState.companyLinkedinId === companyLinkedinId) return;

      appState = { ...appState, companyLinkedinId };
      emitChange();
    },

    setCompanyDomain: (companyDomain: string) => {
      if (appState.companyDomain === companyDomain || domainIgnoreList.includes(companyDomain)) return;

      appState = { ...appState, companyDomain };
      emitChange();
    },

    setCompanyPage: ({ companyLinkedinId, companyDomain }) => {
      if (appState.page === Page.Company && appState.companyLinkedinId === companyLinkedinId) return;

      appState = {
        ...initialState,
        page: Page.Company,
        companyLinkedinId,
        companyDomain,
        isOpen: appState.isOpen,
        url: appState.url,
        notRevealedContactsIds: appState.notRevealedContactsIds,
        contactFilters: { ...appState.contactFilters, searchText: '' },
        settingsStorage: { ...appState.settingsStorage },
      };
      emitChange();
    },

    setContactPage: (linkedinId?: string) => {
      if (appState.page === Page.Contact && appState.contactLinkedinId === linkedinId) return;

      appState = {
        ...initialState,
        page: Page.Contact,
        contactLinkedinId: linkedinId,
        isOpen: appState.isOpen,
        url: appState.url,
        notRevealedContactsIds: appState.notRevealedContactsIds,
        contactFilters: { ...appState.contactFilters, searchText: '' },
        settingsStorage: { ...appState.settingsStorage },
      };
      emitChange();
    },

    setContactLinkedinId: (contactLinkedinId?: string) => {
      if (appState.contactLinkedinId === contactLinkedinId) return;

      appState = { ...appState, contactLinkedinId };
      emitChange();
    },

    setSearchPage: () => {
      appState = {
        ...initialState,
        page: Page.Search,
        isOpen: appState.isOpen,
        url: appState.url,
        notRevealedContactsIds: appState.notRevealedContactsIds,
        contactFilters: { ...appState.contactFilters, searchText: '' },
        settingsStorage: { ...appState.settingsStorage },
      };
      emitChange();
    },

    setSettingsPage: () => {
      appState = { ...appState, page: Page.Settings, prevPage: appState.page };
      emitChange();
    },

    resetSettingsPage: () => {
      appState = { ...appState, page: appState.prevPage || Page.Home };
      emitChange();
    },

    setCollectedContactInfo: (collectedContactInfo: CollectedContactInfo) => {
      appState = { ...appState, collectedContactInfo };
      emitChange();
    },

    setCollectedContactsSearchInfo: (collectedContactsSearchInfo: Partial<Contact>[]) => {
      appState = { ...appState, collectedContactsSearchInfo };
      emitChange();
    },

    setContactsSearchText(searchText) {
      appState = { ...appState, contactFilters: { ...appState.contactFilters, searchText } };
      emitChange();
    },

    setContactsPersona(persona) {
      appState = { ...appState, contactFilters: { ...appState.contactFilters, persona } };
      emitChange();
    },

    setContactsIncludeCountries(includeCountries) {
      appState = { ...appState, contactFilters: { ...appState.contactFilters, includeCountries } };
      emitChange();
    },

    setContactsDetails(contactDetails) {
      appState = { ...appState, contactFilters: { ...appState.contactFilters, contactDetails } };
      emitChange();
    },

    setContactsStatusFilterValue(value) {
      appState = { ...appState, contactFilters: { ...appState.contactFilters, status: value } };
      emitChange();
    },

    setHomePage: () => {
      appState = {
        ...initialState,
        isOpen: appState.isOpen,
        url: appState.url,
        notRevealedContactsIds: appState.notRevealedContactsIds,
        contactFilters: { ...appState.contactFilters, searchText: '' },
        settingsStorage: { ...appState.settingsStorage },
      };
      emitChange();
    },

    setCompanyTabName: (companyTabName) => {
      appState = { ...appState, companyTabName };
      emitChange();
    },

    addNotRevealedContactId: (contactId) => {
      appState = { ...appState, notRevealedContactsIds: [...appState.notRevealedContactsIds, contactId] };
      emitChange();
    },

    getSettingsStorageValue: (key) => appState.settingsStorage[key],

    setSettingsStorageValue: (keyValue) => {
      appState = { ...appState, settingsStorage: { ...appState.settingsStorage, ...keyValue } };
      emitChange();
    },

    setSearchPagePagination: (pagination) => {
      appState = { ...appState, searchPagePagination: pagination };
      emitChange();
    },
  };
};

export const appStore = makeAppStore();
