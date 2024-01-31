import { useEffect } from 'react';
import { useQuery, useQueryClient, UseQueryResult } from 'react-query';
import { useAppState } from '../../../AppStateProvider';
import { contactsApi } from '../api';
import { appStore } from '../../../services/appStore';
import contactQueryKey from './contactQueryKey';
import { Contact } from '../../../domain/contact';
import { useHasTimedOut } from '../../../hooks/useHasTimedOut';

export const useContactQuery = (): UseQueryResult<Contact> => {
  const appState = useAppState();
  const queryClient = useQueryClient();
  const { isOpen, contactLinkedinId, collectedContactInfo } = appState;
  const companyIds = collectedContactInfo?.companyLinkedinIds || [];

  const hasTimedOut = useHasTimedOut();

  const isEnabled = () => {
    if (!isOpen) return false;

    if (hasTimedOut && contactLinkedinId) return true;

    return hasTimedOut && !!companyIds.length && !!collectedContactInfo?.name;
  };

  const query = useQuery(
    contactQueryKey.fromState(appState),
    async ({ signal }) => {
      const contact = await contactsApi.getContact(
        {
          linkedinId: contactLinkedinId!,
          companyLinkedinIds: companyIds.map((id) => parseInt(id)),
          fullName: collectedContactInfo?.name,
          companyName: collectedContactInfo?.companyName,
        },
        signal
      );
      if (contact) queryClient.setQueryData(contactQueryKey.fromData(contact), query.data);
      return contact;
    },
    { enabled: isEnabled(), retry: false, refetchInterval: false }
  );

  useEffect(() => {
    if (query.status !== 'success' || !query.data) return;
    appStore.setCompanyDomain(query.data?.originalSite);
  }, [query.status, contactLinkedinId]);

  return query;
};
