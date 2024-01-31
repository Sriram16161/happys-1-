import React, { FC } from 'react';
import { SWReactIcons } from '@similarweb/icons';
import { useTranslation } from 'react-i18next';
import { Checkbox } from '../../../../components/Checkbox';
import { ContactStatusFilterValue } from '../../../../domain/contact';
import { StyledFilter, StyledFilterSummary, StyledFilterName, StyledNotEmptyIndicator } from '../styles';
import { StyledCheckbox, StyledRevealedGroup, StyledStatusFilterDetails } from './styles';

export type ContactStatusFilterProps = {
  isOpen: boolean;
  onToggle(): void;
  value: ContactStatusFilterValue;
  onChange(value: ContactStatusFilterValue): void;
};

export const ContactStatusFilter: FC<ContactStatusFilterProps> = ({ isOpen, onToggle, value, onChange }) => {
  const { t } = useTranslation();
  const isNotEmpty = Object.values(value).some(Boolean);

  const isRevealedHalfChecked = Boolean(value.exported || value.notExported) && !(value.exported && value.notExported);

  const handleChange = (key: keyof ContactStatusFilterValue) => () => {
    onChange({ ...value, [key]: !value[key] });
  };

  const handleRevealedChange = () => {
    if (value.exported || value.notExported) {
      onChange({ ...value, exported: false, notExported: false });
    } else {
      onChange({ ...value, exported: true, notExported: true });
    }
  };

  return (
    <StyledFilter>
      <StyledFilterSummary isOpen={isOpen} onClick={onToggle}>
        <StyledFilterName>{t('contacts.filters.status')}</StyledFilterName>
        {isNotEmpty && <StyledNotEmptyIndicator />}
        <SWReactIcons iconName="chev-down" size="sm" />
      </StyledFilterSummary>
      <StyledStatusFilterDetails isOpen={isOpen}>
        <Checkbox
          isChecked={value.notRevealed}
          label={t('contacts.filters.status.not_revealed')}
          onClick={handleChange('notRevealed')}
        />
        <StyledRevealedGroup>
          <Checkbox
            isChecked={value.exported && value.notExported}
            isHalfChecked={isRevealedHalfChecked}
            onClick={handleRevealedChange}
            label={t('contacts.filters.status.revealed')}
          />
          <StyledCheckbox
            isChecked={value.exported}
            label={t('contacts.filters.status.exported')}
            onClick={handleChange('exported')}
          />
          <StyledCheckbox
            isChecked={value.notExported}
            label={t('contacts.filters.status.not_exported')}
            onClick={handleChange('notExported')}
          />
        </StyledRevealedGroup>
      </StyledStatusFilterDetails>
    </StyledFilter>
  );
};
