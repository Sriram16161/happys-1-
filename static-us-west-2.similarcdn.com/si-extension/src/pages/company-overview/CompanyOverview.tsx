import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { CompanyInfoItem } from './CompanyInfoItem';
import { useCompanyQuery } from '../../features/company/useCompanyQuery';
import { CompanyName } from '../../components/CompanyName/CompanyName';
import { CompanyActionsContainer } from './CompanyActionsContainer';
import { CompanyIndustry } from '../../components/CompanyIndustry';
import { EngagementView } from './EngagementView';
import { TrafficShareView } from './TrafficShareView/TrafficShareView';
import { Company } from '../../domain/company';
import { LoadingView } from '../../components/LoadingView';
import { EmptyStateView } from '../../components/EmptyStateView';
import { TotalVisitsView } from './TotalVisitsView';
import { ExpandableText } from '../../components/ExpandableText';
import { allTrackers } from '../../services/tracking/tracking';
import { useHasTimedOut } from '../../hooks/useHasTimedOut';
import { StyledContainerWithNav } from '../styles';
import {
  StyledCompanyOverview,
  StyledExpandableText,
  StyledCompanyInfoItem,
  StyledSectionView,
  StyledSeparator,
} from './styles';

export const WIDTH_380_VERSION = '1.3.0';

export type CompanyOverviewProps = {
  onEmployeesClick(): void;
  variant?: 'page' | 'card';
};

export const CompanyOverview: FC<CompanyOverviewProps> = ({ onEmployeesClick, variant = 'page' }) => {
  const { t } = useTranslation();
  const companyQuery = useCompanyQuery({ withDelay: variant === 'card' });

  const hasTimedOut = useHasTimedOut({ condition: variant === 'card', time: 3000 });

  const company = companyQuery.data;
  const isLoading =
    variant === 'page' ? companyQuery.isLoading : companyQuery.isLoading || (!hasTimedOut && companyQuery.isIdle);

  const getHeadquarters = (company: Company) => {
    let headquarters = company.country;

    if (company.city) headquarters += `, ${company.city}`;

    return headquarters;
  };

  if (isLoading) return <LoadingView />;

  if (!company || companyQuery.isError)
    return (
      <StyledContainerWithNav data-automation="CompanyEmptyState">
        <EmptyStateView
          messageKey="company.empty_state.message_linkedin"
          img="/images/empty-state-lens.svg"
          variant={variant === 'page' ? 'lens' : 'lens-rised'}
        />
      </StyledContainerWithNav>
    );

  const handleClickOnEmployees = () => {
    allTrackers.dispatchTrackEvent(
      'company data',
      'see employees',
      `employee number/${company?.employeeRange}/${company.name}`
    );
    onEmployeesClick();
  };

  return (
    <StyledCompanyOverview>
      <StyledSectionView withPadding>
        <CompanyName data-automation="CompanyName" company={company} />
        <CompanyActionsContainer company={company} />
        {!!company.industry && <CompanyIndustry industry={company.industry} />}
        <StyledExpandableText>
          <ExpandableText text={company.description} lineHeight={20} oneTime />
        </StyledExpandableText>
        <StyledSeparator />
        <CompanyInfoItem
          iconName="company"
          label={t('company.overview.headquarters')}
          value={getHeadquarters(company)}
        />
        <CompanyInfoItem
          iconName="users"
          label={t('company.overview.employees')}
          value={company.employeeRange}
          onClick={handleClickOnEmployees}
        />
        <StyledCompanyInfoItem iconName="revenue" label={t('company.overview.revenue')} value={company.revenueRange} />
      </StyledSectionView>
      <TotalVisitsView company={company} />
      <TrafficShareView company={company} />
      <EngagementView company={company} />
    </StyledCompanyOverview>
  );
};
