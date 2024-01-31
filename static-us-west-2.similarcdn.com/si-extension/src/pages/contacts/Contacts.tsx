import React, { useMemo } from 'react';
import { useCompanyQuery } from '../../features/company/useCompanyQuery';
import { CompanyName } from '../../components/CompanyName';
import { ContactListInfinite } from './ContactList';
import SearchTextBox from '../../components/SearchTextBox/SearchTextBox';
import { translate } from '../../services/i18n';
import { useAppState } from '../../AppStateProvider';
import { appStore } from '../../services/appStore';
import { EmptyStateView } from '../../components/EmptyStateView';
import { useContactListQuery } from '../../features/contacts/queryContactList/useContactListQuery';
import { useContactsCountByCountriesQuery } from '../../features/contacts/queryContactList/useContactsCountByCountriesQuery';
import { PersonaFilter } from './PersonaFilter';
import { StyledCompanyName, StyledContactsScrollContainer, StyledContactsHeader } from './styles';
import { StyledContainerWithNav, StyledContactsContainerWithNav } from '../styles';
import { allTrackers } from '../../services/tracking/tracking';
import { ContactFilters } from './ContactFilters';

export const Contacts = () => {
  const { contactFilters } = useAppState();

  const companyQuery = useCompanyQuery();
  const company = companyQuery.data;

  const useContactListQueryResult = useContactListQuery();
  const { isLoading: isLoadingFilters } = useContactsCountByCountriesQuery();

  const contactsNumber = useMemo(
    () => useContactListQueryResult?.data?.pages.reduce((acc: number, page) => acc + page.length, 0) ?? 0,
    [useContactListQueryResult?.data?.pages]
  );

  const handleTrackSearch = (searchText: string) => {
    appStore.setContactsSearchText(searchText);
    allTrackers.dispatchTrackEvent('contacts options', 'apply enter', `apply search/contact name search/${searchText}`);
  };

  if (!company || companyQuery.isError)
    return (
      <StyledContainerWithNav data-automation="EmptyContacts">
        <EmptyStateView
          messageKey="company.empty_state.message_linkedin"
          img="/images/empty-state-lens.svg"
          variant="lens"
        />
      </StyledContainerWithNav>
    );

  return (
    <StyledContactsContainerWithNav>
      <StyledContactsScrollContainer>
        <StyledContactsHeader>
          <StyledCompanyName data-automation="EmployeeCompanyName">
            <CompanyName company={company} variant="contacts_list" />
          </StyledCompanyName>
          <SearchTextBox
            searchText={contactFilters.searchText}
            onChange={handleTrackSearch}
            placeholder={translate('contacts.search_placeholder')}
            isLoading={useContactListQueryResult.isLoading}
          />
          <ContactFilters contactsNumber={contactsNumber} />
          <PersonaFilter isDisabled={isLoadingFilters} />
        </StyledContactsHeader>
        <ContactListInfinite {...useContactListQueryResult} />
      </StyledContactsScrollContainer>
    </StyledContactsContainerWithNav>
  );
};
