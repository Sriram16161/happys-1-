import { QueryKey } from 'react-query';
import { AppState } from '../../../services/appStore';

export const CONTACTS_COUNT_BY_COUNTRIES_KEY = 'contactsCountByCountries';
export const makeContactsCountByCountriesQueryKey = (appState: AppState) => {
  const {
    companyLinkedinId: linkedinId,
    companyDomain: domain,
    contactFilters: { searchText, persona, contactDetails, status },
  } = appState;
  return [CONTACTS_COUNT_BY_COUNTRIES_KEY, linkedinId, domain, searchText, persona, contactDetails, status] as const;
};

export type ContactsCountByCountriesQueryKey = ReturnType<typeof makeContactsCountByCountriesQueryKey>;

export const isContactsCountByCountriesQueryKey = (queryKey: QueryKey): queryKey is ContactsCountByCountriesQueryKey =>
  queryKey[0] === CONTACTS_COUNT_BY_COUNTRIES_KEY;
