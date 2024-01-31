import React from 'react';
import { useTranslation } from 'react-i18next';
import { Company } from '../../../domain/company';
import { NoDataView, NoDataViewVariant } from '../NoDataView';
import { TotalVisitsViewContent } from './TotalVisitsViewContent';
import { StyledTrafficSectionHeader, StyledTrafficSectionHeading } from '../TrafficSection/styles';
import { StyledSectionView } from '../styles';

export const TotalVisitsView = ({ company }: { company: Company }) => {
  const { t } = useTranslation();

  return (
    <StyledSectionView data-automation="TotalVisits">
      <StyledTrafficSectionHeader>
        <StyledTrafficSectionHeading>{t('company.total_visits')}</StyledTrafficSectionHeading>
      </StyledTrafficSectionHeader>
      {company.totalVisits.trend?.length > 0 ? (
        <TotalVisitsViewContent data={company.totalVisits.trend} />
      ) : (
        <NoDataView variant={NoDataViewVariant.monthlyVisits} />
      )}
    </StyledSectionView>
  );
};
