import { SWReactIcons } from '@similarweb/icons';
import React, { useState, useMemo } from 'react';
import { colorsPalettes } from '@similarweb/styles';
import { useTranslation } from 'react-i18next';
import { CheckboxDropdownOption } from '../../../../components/Dropdown';
import { Country } from '../../../../domain/country';
import { ContactsCountByCountry } from '../../../../domain/contact';
import {
  StyledFilter,
  StyledFilterSummary,
  StyledFilterName,
  StyledNotEmptyIndicator,
  StyledFilterDetails,
} from '../styles';
import { StyledCountriesSearch, StyledDivider, StyledCountryList, StyledCountryIcon } from './styles';

export type CountryFilterProps = {
  isOpen: boolean;
  onToggle(): void;
  selectedCountries: Country[];
  initiallySelectedCountries: Country[];
  onChange(countries: Country[]): void;
  contactsCountByCountries: ContactsCountByCountry[];
};

export const CountryFilter = (props: CountryFilterProps) => {
  const { isOpen, onToggle, selectedCountries, onChange, contactsCountByCountries, initiallySelectedCountries } = props;
  const [searchText, setSearchText] = useState('');
  const { t } = useTranslation();
  const countries = useMemo(() => contactsCountByCountries.map((c) => c.country), [contactsCountByCountries]);
  const selectedCountryIdsSet = useMemo(
    () => new Set(selectedCountries.map((country) => country.id)),
    [selectedCountries]
  );
  const initiallyNotSelectedCountries = useMemo(() => {
    const initiallySelectedCountryIdsSet = new Set(initiallySelectedCountries.map((country) => country.id));
    return countries.filter(
      (country) =>
        !initiallySelectedCountryIdsSet.has(country.id) && country.text.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [initiallySelectedCountries, searchText, countries]);

  const handleClickOnCountry = (country: Country) => {
    if (selectedCountryIdsSet.has(country.id)) {
      onChange(selectedCountries.filter((c) => c.id !== country.id));
    } else {
      onChange(selectedCountries.concat(country));
    }
  };

  const isNotEmpty = selectedCountries.length > 0;

  return (
    <StyledFilter>
      <StyledFilterSummary isOpen={isOpen} onClick={onToggle}>
        <StyledFilterName>{t('contacts.filters.countries.name')}</StyledFilterName>
        {isNotEmpty && <StyledNotEmptyIndicator />}
        <SWReactIcons iconName="chev-down" size="sm" />
      </StyledFilterSummary>
      <StyledFilterDetails isOpen={isOpen}>
        <StyledCountriesSearch
          placeholder={t('contacts.filters.countries.search_placeholder')}
          debounceTime={0}
          searchText={searchText}
          onChange={(searchText) => setSearchText(searchText)}
        />
        <StyledDivider />
        <StyledCountryList>
          {initiallySelectedCountries.map((country) => (
            <CheckboxDropdownOption
              key={country.id}
              isSelected={selectedCountryIdsSet.has(country.id)}
              onClick={() => handleClickOnCountry(country)}
            >
              <StyledCountryIcon countryCode={country.id} />
              {country.text}
            </CheckboxDropdownOption>
          ))}
          {initiallySelectedCountries.length > 0 && <StyledDivider color={colorsPalettes.carbon[50]} />}
          {initiallyNotSelectedCountries.map((country) => (
            <CheckboxDropdownOption
              key={country.id}
              isSelected={selectedCountryIdsSet.has(country.id)}
              onClick={() => handleClickOnCountry(country)}
            >
              <StyledCountryIcon countryCode={country.id} />
              {country.text}
            </CheckboxDropdownOption>
          ))}
        </StyledCountryList>
      </StyledFilterDetails>
    </StyledFilter>
  );
};
