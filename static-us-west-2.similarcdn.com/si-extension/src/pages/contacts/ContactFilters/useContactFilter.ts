import { useMemo, useState } from 'react';
import { useAppState } from '../../../AppStateProvider';
import { appStore } from '../../../services/appStore';
import { allTrackers } from '../../../services/tracking/tracking';
import { Country } from '../../../domain/country';
import { ContactDetail } from '../../../domain/contact';

export enum ContactFilter {
  countries = 'countries',
  contactDetails = 'contactDetails',
  status = 'status',
}

export const ContactFilterTrackingName: Record<ContactFilter, string> = {
  [ContactFilter.countries]: 'location',
  [ContactFilter.contactDetails]: 'contact details',
  [ContactFilter.status]: 'status',
};

export const useContactFilter = ({ contactsNumber }: { contactsNumber: number }) => {
  const [isFiltersModalOpen, setIsFiltersModalOpen] = useState(false);
  const [openedFilter, setOpenedFilter] = useState<ContactFilter | null>(null);
  const { contactFilters } = useAppState();

  const [selectedCountries, setSelectedCountries] = useState<Country[]>(contactFilters.includeCountries);
  const [selectedContactDetails, setSelectedContactDetails] = useState<ContactDetail | null>(
    contactFilters.contactDetails
  );
  const [contactStatus, setContactStatus] = useState(contactFilters.status);

  const dirtyFilters = useMemo(() => {
    const dirtyFilters = [];
    if (selectedCountries.length > 0) dirtyFilters.push(ContactFilter.countries);
    if (selectedContactDetails) dirtyFilters.push(ContactFilter.contactDetails);
    if (Object.values(contactStatus).some(Boolean)) dirtyFilters.push(ContactFilter.status);

    return dirtyFilters;
  }, [selectedCountries, selectedContactDetails, contactStatus]);

  const appliedFiltersCount = dirtyFilters.length;

  const getSelectedFiltersList = () => {
    return dirtyFilters.map((filter) => ContactFilterTrackingName[filter]).join(', ');
  };

  const trackFilterEvents = (action: string) =>
    allTrackers.dispatchTrackEvent(
      'extension filters',
      action,
      `${contactsNumber}/${getSelectedFiltersList()}/${contactFilters.persona ? 1 : 0}`
    );

  const handleClickOnDetails = (detail: ContactDetail) => {
    if (selectedContactDetails === detail) {
      setSelectedContactDetails(null);
    } else {
      setSelectedContactDetails(detail);
    }
  };

  const handleApplyFilters = () => {
    trackFilterEvents('show results');
    appStore.setContactsIncludeCountries(selectedCountries);
    appStore.setContactsDetails(selectedContactDetails);
    appStore.setContactsStatusFilterValue(contactStatus);
    setIsFiltersModalOpen(false);
  };

  const handleClickOnClearFilters = () => {
    trackFilterEvents('clear filters');
    appStore.setContactsIncludeCountries([]);
    appStore.setContactsDetails(null);
    appStore.setContactsStatusFilterValue({});
    setSelectedCountries([]);
    setSelectedContactDetails(null);
    setContactStatus({});
    setIsFiltersModalOpen(false);
  };

  const toggleFilter = (filter: ContactFilter) => {
    setOpenedFilter((openedFilter) => (openedFilter === filter ? null : filter));
    if (openedFilter !== filter) {
      trackFilterEvents(`expaned ${ContactFilterTrackingName[filter]}`);
    }
  };

  const resetFilters = () => {
    setSelectedCountries(contactFilters.includeCountries);
    setSelectedContactDetails(contactFilters.contactDetails);
    setContactStatus(contactFilters.status);
  };

  return {
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
  };
};
