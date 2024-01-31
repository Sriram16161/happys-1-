import React from 'react';
import { useTranslation } from 'react-i18next';
import { StyledNoDataContainer, StyledNoDataIcon, StyledNoDataSubtitle, StyledNoDataTitle } from './styles';
import { useIsWithinLinkedin } from '../../../hooks/useIsWithinLinkedin';

export enum NoDataViewVariant {
  monthlyVisits = 'monthlyVisits',
  trafficShare = 'trafficShare',
}

export const NoDataView = ({ variant }: { variant: NoDataViewVariant }) => {
  const { t } = useTranslation();
  const isWithinLinkedin = useIsWithinLinkedin();

  const subtitleKey = isWithinLinkedin ? 'company.no_data.subtitle.linkedin' : 'company.no_data.subtitle';

  return (
    <StyledNoDataContainer variant={variant}>
      <StyledNoDataIcon iconName="no-data-lab" variant={variant} size="lg" />
      <StyledNoDataTitle>{t('company.no_data.title')}</StyledNoDataTitle>
      <StyledNoDataSubtitle>{t(subtitleKey)}</StyledNoDataSubtitle>
    </StyledNoDataContainer>
  );
};
