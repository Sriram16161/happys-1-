import React, { useState } from 'react';
import { SWReactIcons } from '@similarweb/icons';
import { colorsPalettes } from '@similarweb/styles';
import { translate } from '../../../../services/i18n';
import { CrmAccount, Crm } from '../../../../domain/crm';
import { Dropdown } from '../../../../components/Dropdown';
import { useCrmStatusQuery } from '../../../../features/crm/useCrmStatusQuery';
import { useUserQuery } from '../../../../features/user/useUserQuery';
import { StyledDropdownOption } from '../../../../components/Dropdown/styles';
import { Contact } from '../../../../domain/contact';
import { useExportContactsToCrmMutation } from '../../../../features/crm/exportContactsToCrm/exportContactsToCrmMutation';
import { CrmExportPreviewModal } from '../CrmExportPreviewModal';
import { StyledCrmExportButton } from './styles';
import { allTrackers } from '../../../../services/tracking/tracking';

export const NEW_ACCOUNT_VALUE = 'new_account';

export type CrmExportContainerProps = {
  crm: Crm;
  contact: Contact;
};

export const CrmExportContainer = ({ crm, contact }: CrmExportContainerProps) => {
  const crmStatusQuery = useCrmStatusQuery(crm);
  const userQuery = useUserQuery();

  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [isPreviewModalOpened, setIsPreviewModalOpened] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<CrmAccount | null>(null);

  const isLeadExportEnabled = crmStatusQuery.data?.isLeadExportEnabled;
  const isContactExportEnabled = crmStatusQuery.data?.isContactExportEnabled;
  const isDropdownShown = crm === Crm.salesforce && isLeadExportEnabled && isContactExportEnabled;

  const exportContactsToCrmMutation = useExportContactsToCrmMutation();

  const trackExportEvent = (action: string, eventSubName?: string) =>
    allTrackers.dispatchTrackEvent(
      'contacts export',
      action,
      `export to ${crm}/${userQuery.data?.contactsQuota.remaining ?? ''}${eventSubName ? `/${eventSubName}` : ''}`
    );

  const exportAsLead = () => {
    trackExportEvent('export contact', `export as lead`);
    exportContactsToCrmMutation.mutate({
      payload: {
        countries: [999],
        leads: [
          {
            contactId: contact.id,
            domain: contact.site,
          },
        ],
      },
      crm,
      onSuccess: () => trackExportEvent('export success', 'export as lead'),
      onError: () => trackExportEvent('export failed', 'export as lead'),
    });
  };

  const exportAsContact = () =>
    exportContactsToCrmMutation.mutate({
      payload: {
        countries: [999],
        contacts: [
          {
            contactId: contact.id,
            domain: contact.site,
            accountId: selectedAccount?.id === NEW_ACCOUNT_VALUE ? undefined : selectedAccount?.id,
          },
        ],
      },
      crm,
      onSuccess: () => trackExportEvent('export success', 'export as contact'),
      onError: () => trackExportEvent('export failed', 'export as contact'),
    });

  const handleClickCrmExportButton = () => {
    if (isDropdownShown) {
      setIsDropdownOpened(true);
      return;
    }

    if (crm === Crm.hubspot || (crm === Crm.salesforce && isContactExportEnabled)) {
      setIsPreviewModalOpened(true);
      return;
    }

    if (isLeadExportEnabled) exportAsLead();
  };

  const handleExportAsLeadClick = () => {
    setIsDropdownOpened(false);
    exportAsLead();
  };

  const handleExportAsContactClick = () => {
    setIsPreviewModalOpened(true);
    setIsDropdownOpened(false);
  };

  const handleConfirmPreviewClick = () => {
    trackExportEvent('export contact');
    exportAsContact();
    setIsPreviewModalOpened(false);
    setIsDropdownOpened(false);
  };

  const handleClosePreviewModal = () => {
    trackExportEvent('cancel export');
    setIsPreviewModalOpened(false);
  };

  return (
    <>
      <StyledCrmExportButton
        onClick={handleClickCrmExportButton}
        isLoading={exportContactsToCrmMutation.isLoading}
        isActive={isDropdownOpened}
      >
        {!exportContactsToCrmMutation.isLoading && (
          <SWReactIcons iconName={crm} size="xs" iconColor={colorsPalettes.carbon[500]} />
        )}
        {translate('contact_card.export_crm')}
      </StyledCrmExportButton>
      {isDropdownShown && (
        <Dropdown
          isOpened={isDropdownOpened}
          onClose={() => setIsDropdownOpened(false)}
          placement="right"
          minWidth={120}
        >
          <StyledDropdownOption onClick={handleExportAsContactClick}>
            {translate('contact_card.export_sf.as_contact')}
          </StyledDropdownOption>
          <StyledDropdownOption onClick={handleExportAsLeadClick}>
            {translate('contact_card.export_sf.as_lead')}
          </StyledDropdownOption>
        </Dropdown>
      )}
      <CrmExportPreviewModal
        isOpen={isPreviewModalOpened}
        onClose={handleClosePreviewModal}
        crm={crm}
        contact={contact}
        selectedAccount={selectedAccount}
        setSelectedAccount={setSelectedAccount}
        onConfirm={handleConfirmPreviewClick}
        trackExportEvent={trackExportEvent}
      />
    </>
  );
};
