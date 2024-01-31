import { useQuery } from 'react-query';
import { useAppState } from '../../../AppStateProvider';
import { contactsApi } from '../api';
import { makeContactsCountByCountriesQueryKey } from './contactsCountByCountriesQueryKey';

export const useContactsCountByCountriesQuery = () => {
  const appState = useAppState();
  return useQuery(
    makeContactsCountByCountriesQueryKey(appState),
    ({ queryKey: [, linkedinId, domain, searchText, persona, contactDetails, status] }) => {
      return contactsApi.getContactsCountByCountries({
        searchText,
        persona,
        domain,
        linkedinId,
        contactDetails,
        status,
      });
    }
  );
};
