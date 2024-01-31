import React, { FC } from 'react';
import { SWReactIcons } from '@similarweb/icons';
import { colorsPalettes } from '@similarweb/styles';
import { useCrmStatusQuery } from '../../../../features/crm/useCrmStatusQuery';
import { allTrackers } from '../../../../services/tracking/tracking';
import { translate } from '../../../../services/i18n';
import { InactiveCrmExportButton } from '../InactiveCrmExportButton';
import { Crm } from '../../../../domain/crm';
import { NotConnectedCrmButton } from '../NotConnectedCrmButton';
import { CrmExportContainerWithEmailCheck } from '../CrmExportContainerWithEmailCheck';
import { Contact } from '../../../../domain/contact';
import { StyledCrmExportButtonSmall, StyledCrmLink } from '../CrmExportContainer/styles';
import { Tooltip } from '../../../../components/Tooltip';

export const userRoleTrackingName: Record<string, string> = {
  AccountAdmin: 'admin',
  AccountChampion: 'champion',
  AccountUser: 'user',
};

export const CrmExportActionsContainer: FC<{ contact: Contact; isFirstInList: boolean }> = ({
  contact,
  isFirstInList,
}) => {
  const hsStatusQuery = useCrmStatusQuery(Crm.hubspot);
  const sfStatusQuery = useCrmStatusQuery(Crm.salesforce);

  if (hsStatusQuery.isLoading || sfStatusQuery.isLoading) return null;

  const isHbIntegrated = !!hsStatusQuery.data;
  const isSfIntegrated = !!sfStatusQuery.data;
  const isHbExportEnabled = hsStatusQuery.data?.isContactExportEnabled;
  const isSfExportEnabled = sfStatusQuery.data?.isContactExportEnabled || sfStatusQuery.data?.isLeadExportEnabled;

  const { salesforceContactUrl, salesforceLeadUrl, hubspotContactUrl } = contact;

  const handleCrmLinkTrack = (crm: Crm) =>
    allTrackers.dispatchTrackEvent('contacts export', 'see contact in crm', `see record in ${crm}`);

  const handleEnableExportTrack = (action: string, role: string) =>
    allTrackers.dispatchTrackEvent('enable export', action, userRoleTrackingName[role] || '');

  if (salesforceContactUrl || salesforceLeadUrl) {
    return (
      <Tooltip
        placement={isFirstInList ? 'left' : 'top-left'}
        content={translate('contact_card.open_in_sf')}
        minWidth={141}
      >
        <StyledCrmLink
          href={salesforceContactUrl || salesforceLeadUrl}
          target="_blank"
          onMouseDown={() => handleCrmLinkTrack(Crm.salesforce)}
        >
          <StyledCrmExportButtonSmall>
            <SWReactIcons iconName={Crm.salesforce} size="xs" iconColor={colorsPalettes.carbon[500]} />
          </StyledCrmExportButtonSmall>
        </StyledCrmLink>
      </Tooltip>
    );
  }

  if (hubspotContactUrl) {
    return (
      <Tooltip
        placement={isFirstInList ? 'left' : 'top-left'}
        content={translate('contact_card.open_in_hs')}
        minWidth={141}
      >
        <StyledCrmLink href={hubspotContactUrl} target="_blank" onMouseDown={() => handleCrmLinkTrack(Crm.hubspot)}>
          <StyledCrmExportButtonSmall>
            <SWReactIcons iconName={Crm.hubspot} size="xs" iconColor={colorsPalettes.carbon[500]} />
          </StyledCrmExportButtonSmall>
        </StyledCrmLink>
      </Tooltip>
    );
  }

  if (!isHbIntegrated && !isSfIntegrated) {
    return <NotConnectedCrmButton handleEnableExportTrack={handleEnableExportTrack} />;
  }

  if (isHbIntegrated && !isSfIntegrated) {
    if (!isHbExportEnabled)
      return (
        <InactiveCrmExportButton
          handleEnableExportTrack={handleEnableExportTrack}
          crm={Crm.hubspot}
          isFirstInList={isFirstInList}
        />
      );
    return <CrmExportContainerWithEmailCheck crm={Crm.hubspot} contact={contact} isFirstInList={isFirstInList} />;
  }

  if (isSfIntegrated && !isHbIntegrated) {
    if (!isSfExportEnabled)
      return (
        <InactiveCrmExportButton
          handleEnableExportTrack={handleEnableExportTrack}
          crm={Crm.salesforce}
          isFirstInList={isFirstInList}
        />
      );
    return <CrmExportContainerWithEmailCheck crm={Crm.salesforce} contact={contact} isFirstInList={isFirstInList} />;
  }

  if (isHbIntegrated && isSfIntegrated) {
    if (!isSfExportEnabled && !isHbExportEnabled)
      return (
        <InactiveCrmExportButton handleEnableExportTrack={handleEnableExportTrack} isFirstInList={isFirstInList} />
      );

    if (isSfExportEnabled && !isHbExportEnabled) {
      return <CrmExportContainerWithEmailCheck crm={Crm.salesforce} contact={contact} isFirstInList={isFirstInList} />;
    }

    if (!isSfExportEnabled && isHbExportEnabled) {
      return <CrmExportContainerWithEmailCheck crm={Crm.hubspot} contact={contact} isFirstInList={isFirstInList} />;
    }

    if (isHbIntegrated && isSfIntegrated && isSfExportEnabled && isHbExportEnabled) {
      return <CrmExportContainerWithEmailCheck crm={Crm.salesforce} contact={contact} isFirstInList={isFirstInList} />;
    }
  }

  return null;
};
