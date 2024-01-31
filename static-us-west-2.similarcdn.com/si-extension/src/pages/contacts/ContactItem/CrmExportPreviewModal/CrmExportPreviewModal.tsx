import React from 'react';
import { SWReactIcons } from '@similarweb/icons';
import { colorsPalettes } from '@similarweb/styles';
import { useTranslation } from 'react-i18next';
import { Dropdown } from '../../../../components/Dropdown';
import { StyledSeparator } from '../../../../components/Dropdown/styles';
import { Modal } from '../../../../components/Modal';
import { Contact } from '../../../../domain/contact';
import { CrmAccount, Crm } from '../../../../domain/crm';
import { useCrmStatusQuery } from '../../../../features/crm/useCrmStatusQuery';
import { useCrmExportPreviewModal } from './useCrmExportPreviewModal';
import { StyledLoader } from '../../ContactList/styles';
import { NEW_ACCOUNT_VALUE } from '../CrmExportContainer/CrmExportContainer';
import { CrmExportPreviewAccountItem } from './CrmExportPreviewAccountItem';
import {
  StyledCrmExportPreviewLoader,
  StyledCrmExportPreviewModalText,
  StyledCrmExportDropdownWrapper,
  StyledCrmExportPreviewSelect,
  StyledNewAccount,
  StyledAccountCreateOption,
  StyledAccountSection,
  StyledAccountsList,
} from './styles';

export type CrmExportPreviewModalProps = {
  crm: Crm;
  contact: Contact;
  isOpen: boolean;
  onClose(): void;
  onConfirm(): void;
  selectedAccount: CrmAccount | null;
  setSelectedAccount: (account: CrmAccount) => void;
  trackExportEvent: (action: string, eventSubName?: string) => void;
};

export const CrmExportPreviewModal = ({
  crm,
  contact,
  isOpen,
  onClose,
  onConfirm,
  selectedAccount,
  setSelectedAccount,
  trackExportEvent,
}: CrmExportPreviewModalProps) => {
  const { t } = useTranslation();

  const crmStatusQuery = useCrmStatusQuery(crm);
  const canCreateNewAccount = crmStatusQuery.data?.isAccountExportEnabled;

  const {
    isLoading,
    suggestedAccounts,
    isFetchingNextPage,
    isAllAccountsLoading,
    allAccounts,
    handleCloseDropdown,
    handleSelectAccount,
    isDropdownOpened,
    setIsDropdownOpened,
    searchText,
    handleSearchText,
  } = useCrmExportPreviewModal({ crm, contact, isOpen, setSelectedAccount, trackExportEvent });

  const isNewAccount = selectedAccount?.id === NEW_ACCOUNT_VALUE;

  const getSelectLabel = () => {
    if (isNewAccount) return contact.companyName;
    return selectedAccount?.name || t('contacts.contact.export_to_crm.preview_modal.select_placeholder');
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      heading={
        crm === Crm.salesforce
          ? t('contacts.contact.export_to_crm.preview_modal.heading.sf')
          : t('contacts.contact.export_to_crm.preview_modal.heading.hs')
      }
      footerJustifyContent="flex-end"
      confirmButtonProps={{
        children: t('contact_card.export_crm'),
        onClick: onConfirm,
        disabled: !selectedAccount,
        variant: 'primary',
      }}
    >
      <StyledCrmExportPreviewModalText>
        {t('contacts.contact.export_to_crm.preview_modal.title', { name: contact.name })}
      </StyledCrmExportPreviewModalText>
      {isLoading ? (
        <StyledCrmExportPreviewLoader>
          <StyledLoader />
        </StyledCrmExportPreviewLoader>
      ) : (
        <StyledCrmExportDropdownWrapper>
          {isNewAccount && (
            <StyledNewAccount>{t('contacts.contact.export_to_crm.preview_modal.new_account')}</StyledNewAccount>
          )}
          <StyledCrmExportPreviewSelect onClick={() => setIsDropdownOpened(true)} isSelected={!!selectedAccount}>
            {getSelectLabel()}
            <SWReactIcons iconName={'chev-down'} size="xs" />
          </StyledCrmExportPreviewSelect>
          <Dropdown
            isOpened={isDropdownOpened}
            onClose={handleCloseDropdown}
            onCloseFinish={() => handleSearchText('')}
            searchProps={{
              placeholder: t('contacts.contact.export_to_crm.preview_modal.search') || '',
              value: searchText,
              onChange: (e) => handleSearchText(e.target.value),
              isLoading: isAllAccountsLoading,
            }}
          >
            <StyledAccountsList>
              {canCreateNewAccount && (
                <>
                  <StyledAccountCreateOption onClick={() => handleSelectAccount({ id: NEW_ACCOUNT_VALUE })}>
                    <SWReactIcons iconName="add" size="sm" />
                    {t('contacts.contact.export_to_crm.preview_modal.new_account.create')}
                  </StyledAccountCreateOption>
                  {(suggestedAccounts.length > 0 || allAccounts.length > 0) && (
                    <StyledSeparator color={colorsPalettes.carbon[100]} />
                  )}
                </>
              )}
              {suggestedAccounts.length > 0 && (
                <StyledAccountSection>
                  <SWReactIcons iconName="category" size="xs" iconColor={colorsPalettes.carbon[200]} />
                  {t('contacts.contact.export_to_crm.preview_modal.suggested_accounts')}
                </StyledAccountSection>
              )}
              {suggestedAccounts.map((account) => (
                <CrmExportPreviewAccountItem
                  account={account}
                  key={account.id}
                  handleSelectAccount={handleSelectAccount}
                  crm={crm}
                  trackExportEvent={trackExportEvent}
                />
              ))}
              {allAccounts.length > 0 && (
                <StyledAccountSection>
                  <SWReactIcons iconName="category" size="xs" iconColor={colorsPalettes.carbon[200]} />
                  {t('contacts.contact.export_to_crm.preview_modal.all_accounts')}
                </StyledAccountSection>
              )}
              {allAccounts.map((account) => (
                <CrmExportPreviewAccountItem
                  account={account}
                  key={account.id}
                  handleSelectAccount={handleSelectAccount}
                  crm={crm}
                  trackExportEvent={trackExportEvent}
                />
              ))}
              {isFetchingNextPage && (
                <StyledAccountSection>
                  <StyledLoader />
                </StyledAccountSection>
              )}
            </StyledAccountsList>
          </Dropdown>
        </StyledCrmExportDropdownWrapper>
      )}
    </Modal>
  );
};
