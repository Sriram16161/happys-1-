import { useState } from 'react';
import { Contact } from '../../../../domain/contact';
import { CrmAccount, Crm } from '../../../../domain/crm';
import { useCrmSearchAccountsQuery } from '../../../../features/crm/previewModal/useCrmSearchAccountsQuery';
import { usePreviewContactsQuery } from '../../../../features/crm/previewModal/usePreviewContactsQuery';
import { useDebounce } from '../../../../hooks/useDebounce';
import { useObserveIntersection } from '../../../../hooks/useObserveIntersection';
import { NEW_ACCOUNT_VALUE } from '../CrmExportContainer/CrmExportContainer';

export type CrmExportPreviewModalProps = {
  crm: Crm;
  contact: Contact;
  isOpen: boolean;
  setSelectedAccount: (account: CrmAccount) => void;
  trackExportEvent: (action: string, eventSubName?: string) => void;
};

export const useCrmExportPreviewModal = ({
  crm,
  contact,
  isOpen,
  setSelectedAccount,
  trackExportEvent,
}: CrmExportPreviewModalProps) => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchTextDebounced, setSearchTextDebounced] = useState('');

  const { data, isLoading } = usePreviewContactsQuery({ crm, contact, enabled: isOpen });

  const suggestedAccounts = data && data[0] ? data[0].matchedCompanies : [];
  const searchWords = searchText.toLowerCase().split(' ');
  const filteredSuggestedAccounts = searchText
    ? suggestedAccounts.filter((account) => searchWords.every((word) => account.name?.toLowerCase().includes(word)))
    : suggestedAccounts;

  const {
    data: accountsData,
    isFetchingNextPage,
    isLoading: isAllAccountsLoading,
    hasNextPage,
    fetchNextPage,
  } = useCrmSearchAccountsQuery({ searchText: searchTextDebounced, crm, enabled: isOpen });

  const accountsDataPages = accountsData?.pages ?? [];
  const allAccounts = accountsDataPages.flatMap((responseData) => responseData.data);

  const hasAccounts = !!allAccounts.length;

  const getSentinelElementSelector = () => {
    const accountId = allAccounts[allAccounts.length - 3]?.id ?? '';
    return `[data-account-id="${accountId}"]`;
  };

  useObserveIntersection({
    sentinelSelector: getSentinelElementSelector(),
    shouldObserve: isDropdownOpened && hasAccounts && !!hasNextPage && !isFetchingNextPage,
    onIntersection: fetchNextPage as () => void,
  });

  const handleDebouncedSearchText = useDebounce(setSearchTextDebounced, 600);

  const handleSearchText = (searchText: string) => {
    setSearchText(searchText);
    handleDebouncedSearchText(searchText);
  };

  const handleCloseDropdown = () => {
    setIsDropdownOpened(false);
  };

  const handleSelectAccount = (account: CrmAccount) => {
    setSelectedAccount(account);
    setIsDropdownOpened(false);
    trackExportEvent(
      account.id === NEW_ACCOUNT_VALUE ? 'create new account for contact' : 'select existing account for contact'
    );
  };

  return {
    isLoading,
    suggestedAccounts: filteredSuggestedAccounts,
    isFetchingNextPage,
    isAllAccountsLoading,
    allAccounts,
    handleCloseDropdown,
    handleSelectAccount,
    handleSearchText,
    isDropdownOpened,
    setIsDropdownOpened,
    searchText,
  };
};
