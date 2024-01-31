import React from 'react';
import { SWReactIcons } from '@similarweb/icons';
import { colorsPalettes } from '@similarweb/styles';
import { useTranslation } from 'react-i18next';
import { formatPercentage } from '../../../services/numberFormat';
import { CountryService } from '../../../services/country';
import { Company, TopCountries } from '../../../domain/company';
import {
  StyledTrafficShareTable,
  StyledTrafficShareTableHeader,
  StyledTrafficShareTableRow,
  StyledCountryIcon,
  StyledTrafficShareRowName,
  StyledTrafficShareRowValue,
  SeeMoreButton,
  StyledProgressBar,
} from './styles';
import { allTrackers } from '../../../services/tracking/tracking';

export const CountryShareView = ({ topCountries, company }: { topCountries: TopCountries; company: Company }) => {
  const { t } = useTranslation();

  const onSeeMoreButtonClick = () => {
    const countrySharePageURL = `https://pro.similarweb.com/#/sales/account-overview/${company.domain}/company?activeCard=geo`;
    window.open(countrySharePageURL, '_blank');

    const topCountriesString = topCountries.countries
      .map(({ country: countryCode }) => CountryService.getCountryName(countryCode))
      .join(' ');
    allTrackers.dispatchTrackEvent(
      'company data',
      'open geo in platform',
      `see more countries/${topCountriesString}/${company.domain}`
    );
  };

  return (
    <StyledTrafficShareTable>
      <StyledTrafficShareTableHeader>
        <span data-automation="CountriesHeader">{t('company.traffic_share.countries')}</span>
        <span data-automation="ShareHeader">{t('company.traffic_share.share')}</span>
      </StyledTrafficShareTableHeader>
      {topCountries.countries.map(({ country: countryCode, share }) => (
        <StyledTrafficShareTableRow
          data-automation={`TrafficCountry-${CountryService.getCountryName(countryCode)}`}
          key={countryCode}
        >
          <StyledCountryIcon countryCode={countryCode} />
          <StyledTrafficShareRowName>{CountryService.getCountryName(countryCode)}</StyledTrafficShareRowName>
          <StyledTrafficShareRowValue>{formatPercentage(share, 2)}</StyledTrafficShareRowValue>
          <StyledProgressBar progress={formatPercentage(share, 2)} />
        </StyledTrafficShareTableRow>
      ))}
      {topCountries.countries.length >= 5 && (
        <SeeMoreButton onClick={onSeeMoreButtonClick} variant="flat">
          {t('company.traffic_share.see_more_countries')}{' '}
          <SWReactIcons iconName="arrow-right" size="xs" iconColor={colorsPalettes.blue[500]} />
        </SeeMoreButton>
      )}
    </StyledTrafficShareTable>
  );
};
