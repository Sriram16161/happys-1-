import { useInfiniteQuery, UseInfiniteQueryResult } from 'react-query';
import { contactsApi } from '../api';
import { useAppState } from '../../../AppStateProvider';
import { makeContactListQueryKey } from './contactListQueryKey';
import { Contact } from '../../../domain/contact';

const CONTACTS_PER_PAGE = 20;

export const useContactListQuery = (): UseInfiniteQueryResult<Contact[]> => {
  const appState = useAppState();
  const {
    companyLinkedinId,
    companyDomain,
    contactFilters: { includeCountries, contactDetails, status },
  } = appState;

  return useInfiniteQuery({
    queryKey: makeContactListQueryKey(appState),
    queryFn: ({ queryKey: [, linkedinId, domain, searchText, persona], pageParam }) => {
      return contactsApi.getContacts({
        linkedinId,
        domain,
        page: pageParam as number,
        perPage: CONTACTS_PER_PAGE,
        searchText,
        persona,
        includeCountries,
        contactDetails,
        status,
      });
    },
    getNextPageParam: (lastPage, pages) => (lastPage.length === CONTACTS_PER_PAGE ? pages.length : undefined),
    enabled: !!companyLinkedinId || !!companyDomain,
  });
};
