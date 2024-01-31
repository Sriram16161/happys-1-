import { QueryKey } from 'react-query';
import { AppState } from '../../../services/appStore';

export const CONTACTS_KEY = 'contacts';

export type ContactListQueryKey = ReturnType<typeof makeContactListQueryKey>;

export const isContactListQueryKey = (queryKey: QueryKey): queryKey is ContactListQueryKey =>
  queryKey[0] === CONTACTS_KEY;

export const makeContactListQueryKey = (appState: AppState) => {
  const {
    companyLinkedinId,
    companyDomain,
    contactFilters: { searchText, persona, includeCountries, contactDetails, status },
  } = appState;
  const countryIds = includeCountries.map((country) => country.id);
  return [
    CONTACTS_KEY,
    companyLinkedinId,
    companyDomain,
    searchText,
    persona,
    contactDetails,
    status,
    ...countryIds,
  ] as const;
};
