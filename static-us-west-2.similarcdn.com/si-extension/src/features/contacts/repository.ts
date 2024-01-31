import { InfiniteData, Query, QueryClient } from 'react-query';
import { Contact } from '../../domain/contact';
import { CONTACTS_KEY, isContactListQueryKey } from './queryContactList/contactListQueryKey';
import {
  CONTACTS_BY_LINKEDIN_IDS_KEY,
  CONTACTS_BY_NAME_KEY,
  isContactSearchListQueryKey,
} from './queryContactList/contactSearchListKey';
import { CONTACT_KEY } from './contactQuery/contactQueryKey';
import { isContactsCountByCountriesQueryKey } from './queryContactList/contactsCountByCountriesQueryKey';
import { QueryFilters } from 'react-query/types/core/utils';

export type ContactRepository = {
  getContactById(contactId: string): Contact | undefined;
  saveContact(contact: Contact): void;
};

export const makeContactRepository = (queryClient: QueryClient): ContactRepository => {
  const saveSingleContact = (contact: Contact) => {
    queryClient.setQueriesData<Contact>(
      {
        queryKey: [CONTACT_KEY],
        predicate: (query) => (query.state.data as Contact)?.id === contact.id,
      },
      () => contact
    );
  };

  const saveContactInList = (contact: Contact) => {
    queryClient.setQueriesData<InfiniteData<Contact[]>>(
      {
        queryKey: [CONTACTS_KEY],
        predicate: (query) => {
          return (query.state.data as InfiniteData<Contact[]>)?.pages
            .flat()
            .some((contactItem) => contactItem.id === contact.id);
        },
      },
      (queryData: InfiniteData<Contact[]> | undefined) => {
        const pages = queryData?.pages || [];
        const updateContact = (contactItem: Contact): Contact => {
          return contactItem.id === contact.id ? contact : contactItem;
        };
        const updatedPages = pages.map((page) => page.map(updateContact));

        return { pages: updatedPages, pageParams: queryData?.pageParams as unknown[] };
      }
    );
  };

  const saveContactInSearchList = (contact: Contact) => {
    const findQueryWithContactToUpdate = (query: Query) => {
      const contacts = (query.state.data as Contact[]) ?? [];
      return contacts.some((contactItem) => contactItem.id === contact.id);
    };

    const updateContactInList = (queryData: Contact[] | undefined): Contact[] => {
      const updateContacts = (c: Contact) => (c.id === contact.id ? contact : c);
      return queryData?.map(updateContacts) ?? [];
    };

    queryClient.setQueriesData<Contact[]>(
      { queryKey: [CONTACTS_BY_LINKEDIN_IDS_KEY], predicate: findQueryWithContactToUpdate },
      updateContactInList
    );

    queryClient.setQueriesData<Contact[]>(
      { queryKey: [CONTACTS_BY_NAME_KEY], predicate: findQueryWithContactToUpdate },
      updateContactInList
    );
  };

  const getContactByIdFromSingleContactQuery = (contactId: string) => {
    const contact = queryClient.getQueryData<Contact>({
      queryKey: [CONTACT_KEY],
      exact: false,
      predicate: (query) => {
        return (query.state.data as Contact)?.id === contactId;
      },
    });
    return contact;
  };

  const getContactByIdFromListQuery = (contactId: string) => {
    let contact: Contact | undefined;

    queryClient.getQueryData<InfiniteData<Contact[]>>({
      queryKey: [CONTACTS_KEY],
      exact: false,
      predicate: (query) => {
        const pages = (query.state.data as InfiniteData<Contact[]>)?.pages ?? [];
        for (const page of pages) {
          contact = page.find((c) => c.id === contactId);
          if (contact) return true;
        }

        return false;
      },
    });

    return contact;
  };

  const getContactByIdFromSearchListQuery = (contactId: string) => {
    let contact: Contact | undefined;

    const findContactFilter: QueryFilters = {
      exact: false,
      predicate: (query: Query) => {
        if (contact) return true;
        const contacts = (query.state.data as Contact[]) ?? [];
        contact = contacts.find((c) => c.id === contactId);
        return !!contact;
      },
    };

    queryClient.getQueryData<Contact>({ queryKey: [CONTACTS_BY_LINKEDIN_IDS_KEY], ...findContactFilter });
    queryClient.getQueryData<Contact>({ queryKey: [CONTACTS_BY_NAME_KEY], ...findContactFilter });

    return contact;
  };

  const invalidateAllContactListQueries = () => {
    queryClient
      .invalidateQueries({
        predicate: ({ queryKey }) => {
          return [isContactListQueryKey, isContactSearchListQueryKey, isContactsCountByCountriesQueryKey].some(
            (isListQueryFn) => isListQueryFn(queryKey)
          );
        },
        refetchActive: false,
        refetchInactive: false,
      })
      .catch(console.error);
  };

  return {
    saveContact(contact: Contact) {
      saveSingleContact(contact);
      saveContactInList(contact);
      saveContactInSearchList(contact);
      invalidateAllContactListQueries();
    },
    getContactById(contactId: string) {
      return (
        getContactByIdFromSingleContactQuery(contactId) ||
        getContactByIdFromListQuery(contactId) ||
        getContactByIdFromSearchListQuery(contactId)
      );
    },
  };
};
