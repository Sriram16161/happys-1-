import React from 'react';
import { SWReactIcons } from '@similarweb/icons';
import { useTranslation } from 'react-i18next';
import { CheckboxDropdownOption } from '../../../../components/Dropdown';
import { ContactDetail } from '../../../../domain/contact';
import {
  StyledFilter,
  StyledFilterSummary,
  StyledFilterName,
  StyledNotEmptyIndicator,
  StyledFilterDetails,
} from '../styles';
import {
  StyledFilterContactDetailsList,
  StyledFilterContactDetailsOption,
  StyledFilterContactDetailsSubtitle,
} from './styles';

export type ContactDetailsFilterProps = {
  isOpen: boolean;
  onToggle(): void;
  selectedContactDetails: ContactDetail | null;
  handleClickOnDetails(contactDetails: ContactDetail | null): void;
};

export const ContactDetailsFilter = (props: ContactDetailsFilterProps) => {
  const { isOpen, onToggle, selectedContactDetails, handleClickOnDetails } = props;

  const { t } = useTranslation();

  return (
    <StyledFilter>
      <StyledFilterSummary isOpen={isOpen} onClick={onToggle}>
        <StyledFilterName>{t('contacts.filters.details.name')}</StyledFilterName>
        {!!selectedContactDetails && <StyledNotEmptyIndicator />}
        <SWReactIcons iconName="chev-down" size="sm" />
      </StyledFilterSummary>
      <StyledFilterDetails isOpen={isOpen}>
        <StyledFilterContactDetailsSubtitle>
          {t('contacts.filters.details.subtitle')}
        </StyledFilterContactDetailsSubtitle>
        <StyledFilterContactDetailsList>
          <CheckboxDropdownOption
            isSelected={selectedContactDetails === ContactDetail.email}
            onClick={() => handleClickOnDetails(ContactDetail.email)}
            variant="details"
          >
            <StyledFilterContactDetailsOption>{t('contacts.filters.details.email')}</StyledFilterContactDetailsOption>
          </CheckboxDropdownOption>
          <CheckboxDropdownOption
            isSelected={selectedContactDetails === ContactDetail.phone}
            onClick={() => handleClickOnDetails(ContactDetail.phone)}
            variant="details"
          >
            <StyledFilterContactDetailsOption>{t('contacts.filters.details.phone')}</StyledFilterContactDetailsOption>
          </CheckboxDropdownOption>
          <CheckboxDropdownOption
            isSelected={selectedContactDetails === ContactDetail.both}
            onClick={() => handleClickOnDetails(ContactDetail.both)}
            variant="details"
          >
            <StyledFilterContactDetailsOption>
              {t('contacts.filters.details.email_and_phone')}
            </StyledFilterContactDetailsOption>
          </CheckboxDropdownOption>
        </StyledFilterContactDetailsList>
      </StyledFilterDetails>
    </StyledFilter>
  );
};
