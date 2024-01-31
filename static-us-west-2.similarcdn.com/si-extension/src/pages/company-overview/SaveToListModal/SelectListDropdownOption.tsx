import React from 'react';
import { SWReactIcons } from '@similarweb/icons';
import { colorsPalettes } from '@similarweb/styles';
import { useTranslation } from 'react-i18next';
import { OpportunityList, OpportunityListTypeEnum } from '../../../domain/list';
import { StyledExportDropdownOptionTooltip } from '../CompanyActionsContainer/styles';
import { StyledListDropdownOption } from './styles';

export type SelectListDropdownOptionProps = {
  domain: string;
  list: OpportunityList;
  onSelectList(list: OpportunityList): void;
};

export const SelectListDropdownOption = ({ domain, list, onSelectList }: SelectListDropdownOptionProps) => {
  const { t } = useTranslation();

  const isListSelectionDisabled = list.domains.some((domainFromList) => domain === domainFromList);

  const handleSelectList = (list: OpportunityList) => {
    if (!isListSelectionDisabled) onSelectList(list);
  };

  return (
    <StyledExportDropdownOptionTooltip
      key={list.id}
      placement="top"
      content={t('company.save_to_list.disabled_list.tooltip')}
      enabled={isListSelectionDisabled}
      minWidth={250}
    >
      <StyledListDropdownOption onClick={() => handleSelectList(list)} isDisabled={isListSelectionDisabled}>
        <SWReactIcons
          iconName={list.type === OpportunityListTypeEnum.Shared ? 'assign-to-user' : 'snippet-list'}
          iconColor={isListSelectionDisabled ? colorsPalettes.carbon[100] : colorsPalettes.carbon[500]}
        />
        {list.name}
      </StyledListDropdownOption>
    </StyledExportDropdownOptionTooltip>
  );
};
