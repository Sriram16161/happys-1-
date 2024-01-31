import React from 'react';
import { UseQueryResult } from 'react-query';
import { ContactItem } from '../ContactItem';
import { LoadingView } from '../../../components/LoadingView';
import { Contact } from '../../../domain/contact';
import { EmptyStateView } from '../../../components/EmptyStateView';
import { ScrollInfo } from './ScrollInfo';
import { StyledContactList, StyledContactListBackground } from './styles';

type ContactListProps = Pick<UseQueryResult<Contact[]>, 'data' | 'isLoading' | 'isError'> & {
  withCompanyName?: boolean;
  showScrollInfo?: boolean;
};

export const ContactList = (props: ContactListProps) => {
  const { data: contacts = [], isLoading, isError, withCompanyName, showScrollInfo } = props;
  const hasContacts = !!contacts.length;

  if (isLoading) return <LoadingView />;

  if (!hasContacts || isError) {
    return <EmptyStateView variant="lens-small" img="/images/empty-state-lens.svg" messageKey="contacts.empty_state" />;
  }

  return (
    <StyledContactList>
      <StyledContactListBackground data-automation="ContactList">
        {contacts.map((contact, index) => (
          <ContactItem
            key={contact.id || contact.name}
            contact={contact}
            withCompanyName={withCompanyName}
            isFirstInList={index === 0}
          />
        ))}
        {showScrollInfo && <ScrollInfo />}
      </StyledContactListBackground>
    </StyledContactList>
  );
};
