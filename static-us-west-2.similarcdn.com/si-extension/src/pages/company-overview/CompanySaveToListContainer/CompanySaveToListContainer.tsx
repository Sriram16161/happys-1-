import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '../../../components/Tooltip';
import { useOpportunityListCountQuery } from '../../../features/opportunityLists/opportunityListQuery/useOpportunityListCountQuery';
import { MAX_DOMAINS_COUNT } from '../CompanyActionsContainer/CompanyActionsContainer';
import { StyledExportDropdownOption } from '../CompanyActionsContainer/styles';
import { StyledTooltipTitle, StyledTooltipText } from './styles';

export const CompanySaveToListContainer: FC<{ onOpenSaveToListModal: () => void }> = ({ onOpenSaveToListModal }) => {
  const { t } = useTranslation();
  const { data: uniqueDomainsCount } = useOpportunityListCountQuery();

  const isSaveToListDisabled = uniqueDomainsCount ? uniqueDomainsCount >= MAX_DOMAINS_COUNT : false;

  const handleOpenSaveToListModal = () => {
    if (isSaveToListDisabled) return;
    onOpenSaveToListModal();
  };

  return (
    <Tooltip
      content={
        <>
          <StyledTooltipTitle>{t('company.save_to_list.out_of_quota.tooltip.title')}</StyledTooltipTitle>
          <StyledTooltipText>{t('company.save_to_list.out_of_quota.tooltip.text')}</StyledTooltipText>
        </>
      }
      enabled={isSaveToListDisabled}
      placement="top"
      isPositionFixed
      minWidth={271}
    >
      <StyledExportDropdownOption isDisabled={isSaveToListDisabled} onClick={handleOpenSaveToListModal}>
        {t('company.save_to_list.modal.heading')}
      </StyledExportDropdownOption>
    </Tooltip>
  );
};
