import React, { useMemo, useState } from 'react';
import { SWReactIcons } from '@similarweb/icons';
import { colorsPalettes } from '@similarweb/styles';
import { useTranslation } from 'react-i18next';
import { Company } from '../../../domain/company';
import { ButtonVariant } from '../../../components/Button';
import { Modal } from '../../../components/Modal';
import { OpportunityList } from '../../../domain/list';
import { useOpportunityListQuery } from '../../../features/opportunityLists/opportunityListQuery/useOpportunityListQuery';
import { CreateNewListSection } from './CreateNewListSection';
import { SelectListDropdownOption } from './SelectListDropdownOption';
import { StyledLoader } from '../../contacts/ContactList/styles';
import { StyledDropdown } from '../CompanyActionsContainer/styles';
import {
  StyledSaveToListLoader,
  StyledSaveToListModalTitle,
  StyledSaveToListDropdownWrapper,
  StyledSaveToListSelect,
  StyledListCreateOption,
  StyledList,
  StyledSaveToListSeparator,
} from './styles';

export type SaveToListModalProps = {
  company: Company;
  isOpen: boolean;
  onClose(): void;
  onSaveToList(list: OpportunityList): void;
};

export const SaveToListModal = ({ company, isOpen, onClose, onSaveToList }: SaveToListModalProps) => {
  const { name, domain } = company;
  const { t } = useTranslation();
  const [isDropdownOpened, setIsDropdownOpened] = useState(false);
  const [isCreateModeActive, setIsCreateModeActive] = useState(false);
  const [selectedList, setSelectedList] = useState<OpportunityList | null>(null);

  const { data: lists, isLoading } = useOpportunityListQuery();

  const handleSelectList = (list: OpportunityList) => {
    setSelectedList(list);
    setIsDropdownOpened(false);
  };

  const handleConfirmSelectList = () => {
    setSelectedList(null);
    setIsDropdownOpened(false);
    if (selectedList) onSaveToList(selectedList);
  };

  const confirmButtonProps = useMemo(
    () => ({
      children: t('company.save_to_list.modal.confirm'),
      onClick: handleConfirmSelectList,
      disabled: !selectedList,
      variant: 'primary' as ButtonVariant,
    }),
    [selectedList]
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      heading={t('company.save_to_list.modal.heading')}
      footerJustifyContent="flex-end"
      confirmButtonProps={confirmButtonProps}
    >
      <StyledSaveToListModalTitle>{t('company.save_to_list.modal.title', { name })}</StyledSaveToListModalTitle>
      {isLoading ? (
        <StyledSaveToListLoader>
          <StyledLoader />
        </StyledSaveToListLoader>
      ) : (
        <StyledSaveToListDropdownWrapper>
          <StyledSaveToListSelect onClick={() => setIsDropdownOpened(true)} isSelected={!!selectedList}>
            {selectedList?.name || t('company.save_to_list.select_list.placeholder')}
            <SWReactIcons iconName={'chev-down'} size="xs" />
          </StyledSaveToListSelect>
          <StyledDropdown isOpened={isDropdownOpened} onClose={() => setIsDropdownOpened(false)}>
            <StyledList>
              <StyledListCreateOption onClick={() => setIsCreateModeActive(true)}>
                <SWReactIcons iconName="add" size="sm" />
                {t('company.save_to_list.new_list.create')}
              </StyledListCreateOption>
              {(isCreateModeActive || (lists && lists.length > 0)) && (
                <StyledSaveToListSeparator color={colorsPalettes.carbon[100]} />
              )}
              {isCreateModeActive ? (
                <CreateNewListSection
                  domain={domain}
                  onClose={() => setIsCreateModeActive(false)}
                  onSaveToList={onSaveToList}
                />
              ) : (
                lists?.map((list) => (
                  <SelectListDropdownOption list={list} domain={domain} onSelectList={handleSelectList} />
                ))
              )}
            </StyledList>
          </StyledDropdown>
        </StyledSaveToListDropdownWrapper>
      )}
    </Modal>
  );
};
