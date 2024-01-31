import React from 'react';
import { UseInfiniteQueryResult } from 'react-query';
import { ContactItem } from '../ContactItem';
import { LoadingView } from '../../../components/LoadingView';
import { useObserveIntersection } from '../../../hooks/useObserveIntersection';
import { Contact } from '../../../domain/contact';
import { StyledContactList, StyledLoader, StyledLoaderWrapper, StyledContactListBackground } from './styles';
import { EmptyStateView } from '../../../components/EmptyStateView';

export const ContactListInfinite = ({
  data,
  isFetchingNextPage,
  isLoading,
  isError,
  fetchNextPage,
  hasNextPage,
  isFetching,
}: UseInfiniteQueryResult<Contact[]>) => {
  const contacts = data?.pages.flat() || [];
  const hasContacts = !!contacts.length;

  const getSentinelElementSelector = () => {
    const contactId = contacts[contacts.length - 3]?.id ?? '';
    return `[data-contact-id="${contactId}"]`;
  };

  useObserveIntersection({
    sentinelSelector: getSentinelElementSelector(),
    shouldObserve: hasContacts && !!hasNextPage && !isFetchingNextPage,
    onIntersection: fetchNextPage as () => void,
  });

  if (isLoading || (isFetching && !isFetchingNextPage)) return <LoadingView />;

  if (!hasContacts || isError) {
    return <EmptyStateView variant="lens-small" img="/images/empty-state-lens.svg" messageKey="contacts.empty_state" />;
  }

  return (
    <StyledContactList>
      <StyledContactListBackground data-automation="ContactList">
        {contacts.map((contact, index) => (
          <ContactItem key={contact.id || contact.name} contact={contact} isFirstInList={index === 0} />
        ))}
        {isFetchingNextPage && (
          <StyledLoaderWrapper>
            <StyledLoader />
          </StyledLoaderWrapper>
        )}
      </StyledContactListBackground>
    </StyledContactList>
  );
};
