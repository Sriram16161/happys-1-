import React, { useState } from 'react';
import { SWReactIcons } from '@similarweb/icons';
import { Tooltip } from '../../../components/Tooltip';
import { translate } from '../../../services/i18n';
import { CompanyCrmInfoAccount } from '../../../domain/company';
import { Crm } from '../../../domain/crm';
import { capitalize } from '../../../services/string';
import { useCrmStatusQuery } from '../../../features/crm/useCrmStatusQuery';
import { StyledInfoButton, StyledDropdown, StyledInfoButtonWrapper } from '../CompanyActionsContainer/styles';
import { StyledDropdownOption } from '../../../components/Dropdown/styles';
import { allTrackers } from '../../../services/tracking/tracking';

type CrmInfoButtonProps = {
  crm: Crm;
  accounts: CompanyCrmInfoAccount[];
};

export const CrmInfoButton = ({ crm, accounts }: CrmInfoButtonProps) => {
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const { data: crmStatus } = useCrmStatusQuery(crm);

  const handleClickInfoButton = () => setIsDropdownOpened(true);

  const handleCloseDropdown = () => setIsDropdownOpened(false);

  const handleTrackOpenInCrm = () =>
    allTrackers.dispatchTrackEvent('company data', 'see company in CRM', `see in ${crm}`);

  return (
    <StyledInfoButtonWrapper>
      {accounts.length === 1 ? (
        <Tooltip
          placement="top"
          content={translate('company.export_to_crm.open', { crm: capitalize(crm) })}
          minWidth={142}
        >
          <StyledInfoButton>
            <a target="_blank" rel="noreferrer" href={accounts[0].url} onMouseDown={handleTrackOpenInCrm}>
              <SWReactIcons iconName={crm} size="xs" />
            </a>
          </StyledInfoButton>
        </Tooltip>
      ) : (
        <>
          <StyledInfoButton onClick={handleClickInfoButton} isActive={isDropdownOpened}>
            <SWReactIcons iconName={crm} size="xs" />
          </StyledInfoButton>
          <StyledDropdown isOpened={isDropdownOpened} onClose={handleCloseDropdown} minWidth={234} placement="right">
            {accounts.map((account) => (
              <a
                href={account.url}
                key={account.url}
                target="_blank"
                rel="noreferrer"
                onMouseDown={handleTrackOpenInCrm}
              >
                <StyledDropdownOption>
                  {account.companyName}
                  {crmStatus?.isCrmLabelsEnabled &&
                    account.ownerName &&
                    ` ${translate('company.export_to_crm.owned')} ${account.ownerName}`}
                </StyledDropdownOption>
              </a>
            ))}
          </StyledDropdown>
        </>
      )}
    </StyledInfoButtonWrapper>
  );
};
