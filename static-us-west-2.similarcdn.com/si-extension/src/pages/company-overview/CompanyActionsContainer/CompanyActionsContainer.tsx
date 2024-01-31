import React, { FC, useState } from 'react';
import { SWReactIcons } from '@similarweb/icons';
import { useTranslation } from 'react-i18next';
import { Company } from '../../../domain/company';
import { Crm } from '../../../domain/crm';
import { useExportAccountToCrmMutation } from '../../../features/crm/exportAccountToCrm/exportAccountToCrmMutation';
import { useSaveDomainToListMutation } from '../../../features/opportunityLists/saveDomainToList/useSaveDomainToListMutation';
import { SavedListsInfoContainer } from '../SavedListsInfoContainer';
import { SaveToListModal } from '../SaveToListModal';
import { CompanyExportToCrmContainer } from '../CompanyExportToCrmContainer';
import { OpportunityList } from '../../../domain/list';
import { CrmInfoContainer } from '../CrmInfoContainer';
import { useExportQuotaQuery } from '../../../features/user/useExportQuotaQuery';
import { useCrmStatusQuery } from '../../../features/crm/useCrmStatusQuery';
import { useOpportunityListCountQuery } from '../../../features/opportunityLists/opportunityListQuery/useOpportunityListCountQuery';
import { CompanySaveToListContainer } from '../CompanySaveToListContainer';
import { useCompanyActionTracking } from './useCompanyActionTracking';
import { StyledActionButtonWrapper, StyledActionButton, StyledDropdown } from './styles';

export const MAX_DOMAINS_COUNT = 5000;

export const CompanyActionsContainer: FC<{ company: Company }> = ({ company }) => {
  const { domain } = company;
  const { t } = useTranslation();

  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [isSaveToListModalOpened, setIsSaveToListModalOpened] = useState(false);

  const exportAccountToCrmMutation = useExportAccountToCrmMutation();
  const saveDomainToListMutation = useSaveDomainToListMutation();

  useCrmStatusQuery(Crm.hubspot);
  useCrmStatusQuery(Crm.salesforce);
  useExportQuotaQuery();
  useOpportunityListCountQuery();

  const { handleTrackOpenDropdown, handleTrackListAction, handleTrackOnSaveToList, handleTrackExportAction } =
    useCompanyActionTracking();

  const handleOpenDropdown = () => {
    setIsDropdownOpened(true);
    handleTrackOpenDropdown();
  };

  const handleOpenSaveToListModal = () => {
    handleTrackListAction('open save to list options', 'save to list options');
    setIsSaveToListModalOpened(true);
    setIsDropdownOpened(false);
  };

  const handleCloseSaveToListModal = () => {
    handleTrackListAction('cancel export', 'cancel save to list');
    setIsSaveToListModalOpened(false);
  };

  const handleSaveToList = (list: OpportunityList) => {
    setIsSaveToListModalOpened(false);
    setIsDropdownOpened(false);
    handleTrackOnSaveToList(list);
    saveDomainToListMutation.mutate({ list, domain });
  };

  const handleExportToCrm = (crm: Crm) => {
    handleTrackExportAction('export company', crm);
    setIsDropdownOpened(false);
    exportAccountToCrmMutation.mutate({
      domain,
      crm,
      onSuccess: () => handleTrackExportAction('export success', crm),
      onError: () => handleTrackExportAction('export failed', crm),
    });
  };

  const isLoading = exportAccountToCrmMutation.isLoading || saveDomainToListMutation.isLoading;

  return (
    <StyledActionButtonWrapper>
      <StyledActionButton onClick={handleOpenDropdown} isLoading={isLoading} isActive={isDropdownOpened}>
        {isLoading ? (
          <>
            {t(exportAccountToCrmMutation.isLoading ? 'company.export_to_crm.loading' : 'company.save_to_list.loading')}
          </>
        ) : (
          <>
            {t('company.export_to')}
            <SWReactIcons iconName={isDropdownOpened ? 'chev-up' : 'chev-down'} size="xs" />
          </>
        )}
      </StyledActionButton>
      <CrmInfoContainer domain={domain} />
      <SavedListsInfoContainer company={company} />
      <StyledDropdown isOpened={isDropdownOpened} onClose={() => setIsDropdownOpened(false)} minWidth="100%">
        <CompanySaveToListContainer onOpenSaveToListModal={handleOpenSaveToListModal} />
        <CompanyExportToCrmContainer crm={Crm.salesforce} onExport={handleExportToCrm} />
        <CompanyExportToCrmContainer crm={Crm.hubspot} onExport={handleExportToCrm} />
      </StyledDropdown>
      <SaveToListModal
        isOpen={isSaveToListModalOpened}
        onClose={handleCloseSaveToListModal}
        company={company}
        onSaveToList={handleSaveToList}
      />
    </StyledActionButtonWrapper>
  );
};
