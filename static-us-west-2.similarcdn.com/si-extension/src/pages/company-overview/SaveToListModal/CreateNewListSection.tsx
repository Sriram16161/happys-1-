import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { OpportunityList } from '../../../domain/list';
import { Button } from '../../../components/Button';
import { StyledCancelButton } from '../../../components/Modal/styles';
import {
  StyledCreateNewListText,
  StyledCreateNewListTextInput,
  StyledCreateNewListWrapper,
  StyledCreateNewListModalFooter,
} from './styles';

export type CreateNewListSectionProps = {
  domain: string;
  onClose(): void;
  onSaveToList(list: OpportunityList): void;
};

export const CreateNewListSection = ({ domain, onClose, onSaveToList }: CreateNewListSectionProps) => {
  const { t } = useTranslation();
  const [newListName, setNewListName] = useState('');

  const isNameLongEnough = newListName.trim().length >= 1;

  const handleCloseCreateMode = () => {
    onClose();
    setNewListName('');
  };

  const handleChangeNewListName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewListName(e.target.value);
  };

  const handleConfirmCreateNewList = () => {
    handleCloseCreateMode();
    onSaveToList({ id: '', name: newListName, domains: [domain] });
  };

  return (
    <StyledCreateNewListWrapper>
      <StyledCreateNewListText>{t('company.save_to_list.new_list.label')}</StyledCreateNewListText>
      <StyledCreateNewListTextInput
        onChange={handleChangeNewListName}
        placeholder={t('company.save_to_list.new_list.placeholder') || ''}
      />
      <StyledCreateNewListModalFooter>
        <StyledCancelButton onClick={handleCloseCreateMode} variant="flatDark">
          {t('common.cancel')}
        </StyledCancelButton>
        <Button onClick={handleConfirmCreateNewList} variant="primary" disabled={!isNameLongEnough}>
          {t('company.save_to_list.new_list.create.confirm')}
        </Button>
      </StyledCreateNewListModalFooter>
    </StyledCreateNewListWrapper>
  );
};
