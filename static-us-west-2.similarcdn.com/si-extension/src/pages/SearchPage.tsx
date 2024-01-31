import React from 'react';
import { Header } from '../components/Header';
import SearchTextBox from '../components/SearchTextBox/SearchTextBox';
import { Contact } from '../domain/contact';
import { useContactSearchListQuery } from '../features/contacts/queryContactList/useContactSearchListQuery';
import { useContactSearch } from '../hooks/useContactSearch';
import { useAppState } from '../AppStateProvider';
import { translate } from '../services/i18n';
import { ContactList } from './contacts/ContactList';
import { StyledContactsSearchHeader } from './contacts/styles';
import { StyledContainer, StyledPageHeading, StyledSearchContainer } from './styles';

export const SearchPage = () => {
  const { data, isLoading, isError } = useContactSearchListQuery();
  const { searchText, setSearchText, filteredContacts } = useContactSearch(data);
  const { searchPagePagination: pagination } = useAppState();

  const shouldShowScrollInfo = () => {
    if (isLoading || isError) return false;
    if (!data?.length) return false;
    if (pagination.total === 0) return false;
    if (data.length === pagination.pageSize) return false;

    const isLastPage = pagination.page === Math.ceil(pagination.total / pagination.pageSize);
    const recordsOnTheLastPage = pagination.total - (pagination.page - 1) * pagination.pageSize;
    if (isLastPage && recordsOnTheLastPage === data.length) return false;

    return true;
  };

  return (
    <>
      <Header />
      <StyledContainer>
        <StyledSearchContainer data-automation="SearchPage">
          <StyledContactsSearchHeader>
            <StyledPageHeading data-automation="SearchPageHeader">{translate('header.search')}</StyledPageHeading>
            <SearchTextBox
              searchText={searchText}
              onChange={setSearchText}
              placeholder={translate('contacts.search_placeholder')}
              isLoading={isLoading}
            />
          </StyledContactsSearchHeader>
          <ContactList
            data={filteredContacts as Contact[]}
            isLoading={isLoading}
            isError={isError}
            withCompanyName
            showScrollInfo={shouldShowScrollInfo()}
          />
        </StyledSearchContainer>
      </StyledContainer>
    </>
  );
};
