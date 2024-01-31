import React from 'react';
import { SWReactIcons } from '@similarweb/icons';
import { colorsPalettes } from '@similarweb/styles';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '../../../../components/Tooltip';
import { CrmAccount, Crm } from '../../../../domain/crm';
import { StyledAccountOption, StyledAccountOptionLink } from './styles';

export type CrmExportPreviewAccountItemProps = {
  crm: Crm;
  account: CrmAccount;
  handleSelectAccount: (account: CrmAccount) => void;
  trackExportEvent: (action: string, eventSubName?: string) => void;
};

export const CrmExportPreviewAccountItem = ({
  account,
  handleSelectAccount,
  trackExportEvent,
  crm,
}: CrmExportPreviewAccountItemProps) => {
  const { t } = useTranslation();

  const { id, name, crmAccountUrl } = account;

  return (
    <StyledAccountOption data-account-id={id} onClick={() => handleSelectAccount(account)}>
      {name}
      {crmAccountUrl && (
        <Tooltip
          placement="top-left"
          content={t(
            crm === Crm.salesforce
              ? 'contacts.contact.export_to_crm.preview_modal.open_in_sf'
              : 'contacts.contact.export_to_crm.preview_modal.open_in_hs'
          )}
          minWidth={130}
        >
          <StyledAccountOptionLink
            href={crmAccountUrl}
            target="_blank"
            onMouseDown={() => trackExportEvent('see account in CRM')}
          >
            <SWReactIcons iconName="open-new-window" iconColor={colorsPalettes.carbon[300]} />
          </StyledAccountOptionLink>
        </Tooltip>
      )}
    </StyledAccountOption>
  );
};
