import { SWReactIcons } from '@similarweb/icons';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Modal } from '../../../components/Modal';
import { useAppState } from '../../../AppStateProvider';
import { CountryFilter } from './CountryFilter';
import { StyledBadge, StyledOpenFiltersButton, StyledTooltip } from './styles';
import { ContactDetailsFilter } from './ContactDetailsFilter';
import { ContactFilter, useContactFilter } from './useContactFilter';
import { useContactsCountByCountriesQuery } from '../../../features/contacts/queryContactList/useContactsCountByCountriesQuery';
import { ContactStatusFilter } from './ContactStatusFilter';

export const ContactFilters = ({ contactsNumber }: { contactsNumber: number }) => {
  const { t } = useTranslation();
  const { contactFilters } = useAppState();
  const { isLoading, data: contactsCountByCountries = [] } = useContactsCountByCountriesQuery();

  const {
    isFiltersModalOpen,
    setIsFiltersModalOpen,
    openedFilter,
    toggleFilter,
    selectedCountries,
    setSelectedCountries,
    selectedContactDetails,
    contactStatus,
    setContactStatus,
    handleClickOnDetails,
    appliedFiltersCount,
    handleApplyFilters,
    handleClickOnClearFilters,
    trackFilterEvents,
    resetFilters,
  } = useContactFilter({ contactsNumber });

  const handleOpenFilters = () => {
    trackFilterEvents('open filters panel');
    setIsFiltersModalOpen(true);
  };

  return (
    <>
      <StyledTooltip content={t('contacts.filters.more_filters')} placement="top">
        <StyledOpenFiltersButton onClick={handleOpenFilters} disabled={isLoading}>
          <SWReactIcons iconName="toggle-filters" size="xs" />
          {appliedFiltersCount > 0 && <StyledBadge>{appliedFiltersCount}</StyledBadge>}
        </StyledOpenFiltersButton>
      </StyledTooltip>
      <Modal
        isOpen={isFiltersModalOpen}
        onClose={() => setIsFiltersModalOpen(false)}
        heading={t('contacts.filters')}
        cancelButtonProps={{
          children: t('contacts.filters.clear_all'),
          variant: 'flat',
          onClick: handleClickOnClearFilters,
          disabled: appliedFiltersCount === 0,
        }}
        confirmButtonProps={{
          children: t('contacts.filters.show_results'),
          variant: 'primary',
          onClick: handleApplyFilters,
        }}
        footerJustifyContent="space-between"
        onCloseFinish={resetFilters}
      >
        <CountryFilter
          isOpen={openedFilter === ContactFilter.countries}
          onToggle={() => toggleFilter(ContactFilter.countries)}
          selectedCountries={selectedCountries}
          onChange={setSelectedCountries}
          contactsCountByCountries={contactsCountByCountries}
          initiallySelectedCountries={contactFilters.includeCountries}
        />
        <ContactDetailsFilter
          isOpen={openedFilter === ContactFilter.contactDetails}
          onToggle={() => toggleFilter(ContactFilter.contactDetails)}
          selectedContactDetails={selectedContactDetails}
          handleClickOnDetails={handleClickOnDetails}
        />
        <ContactStatusFilter
          isOpen={openedFilter === ContactFilter.status}
          onToggle={() => toggleFilter(ContactFilter.status)}
          value={contactStatus}
          onChange={setContactStatus}
        />
      </Modal>
    </>
  );
};
