import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { contactsApi } from '../api';
import { Contact, hasLinkedinId } from '../../../domain/contact';
import { useAppState } from '../../../AppStateProvider';
import { makeContactSearchListKey } from './contactSearchListKey';
import UrlService from '../../../services/UrlService';
import contactQueryKey from '../contactQuery/contactQueryKey';

type UseContactSearchListQueryReturnProps = {
  data: Partial<Contact>[];
  isLoading: boolean;
  isError: boolean;
};

const DATA_WAITING_TIME = 3000;

export const useContactSearchListQuery = (): UseContactSearchListQueryReturnProps => {
  const queryClient = useQueryClient();
  const appState = useAppState();
  const { isOpen, collectedContactsSearchInfo = [] } = appState;
  const hasLinkedinIds = hasLinkedinId(collectedContactsSearchInfo);
  const [hasTimedOut, setHasTimedOut] = useState(false);

  useEffect(() => {
    setTimeout(() => setHasTimedOut(true), DATA_WAITING_TIME);
  }, []);

  const { data, isLoading, isError } = useQuery({
    queryKey: makeContactSearchListKey(appState),
    queryFn: async ({ signal }) => {
      let payload = [];
      if (hasLinkedinIds) {
        payload = collectedContactsSearchInfo
          .map(({ linkedin, companyName }) => ({
            linkedinId: linkedin ? UrlService.getContactLinkedinIdFromUrl(new URL(linkedin)) : '',
            companyName,
          }))
          .filter((contact) => !!contact.linkedinId);
      } else {
        payload = collectedContactsSearchInfo
          .filter((c) => !!(c.companyLinkedinId || c.companyName))
          .map(({ name, companyLinkedinId, companyName }) => ({
            fullName: name,
            companyLinkedinIds: companyLinkedinId ? [parseInt(companyLinkedinId)] : undefined,
            companyName,
          }));
      }

      if (payload.length === 0) return [];

      const contacts = await contactsApi.getContactsForSearchPage(payload, signal);
      if (Array.isArray(contacts)) {
        contacts.forEach((contact) => {
          queryClient.setQueryData(contactQueryKey.fromData(contact), contact);
        });
      }
      return contacts;
    },
    enabled: isOpen && collectedContactsSearchInfo.length > 0,
    keepPreviousData: true,
  });

  let contacts = collectedContactsSearchInfo;
  if (data) {
    contacts = collectedContactsSearchInfo.map((collectedContact) => {
      const enrichedContact = data.find((enrichedContact) => {
        if (hasLinkedinIds) return enrichedContact.linkedin === collectedContact.linkedin;
        return (
          enrichedContact.name === collectedContact.name &&
          collectedContact.companyLinkedinId &&
          enrichedContact.numericCompanyLinkedinIds?.some((id) => id.toString() === collectedContact.companyLinkedinId)
        );
      });
      return enrichedContact ? { ...collectedContact, ...enrichedContact } : collectedContact;
    });
  }

  const isSearchPageLoading = isLoading || (!hasTimedOut && collectedContactsSearchInfo.length === 0);

  return {
    data: contacts,
    isLoading: isSearchPageLoading,
    isError,
  };
};
