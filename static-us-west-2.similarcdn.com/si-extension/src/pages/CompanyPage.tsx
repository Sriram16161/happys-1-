import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from '../components/Header';
import { Contacts } from './contacts';
import { CompanyOverview } from './company-overview';
import { Tab, TabsView } from '../components/Tabs';
import { useAppState } from '../AppStateProvider';
import { CompanyTabName, Page } from '../domain/page';
import { ContactOverview } from './ContactOverview';
import { StyledTabsContainer } from './styles';
import { useCompanyQuery } from '../features/company/useCompanyQuery';
import { useIsWithinLinkedin } from '../hooks/useIsWithinLinkedin';
import { EmptyStateView } from '../components/EmptyStateView';
import { appStore } from '../services/appStore';
import { allTrackers } from '../services/tracking/tracking';
import TrackingPageViewService from '../services/tracking/TrackingPageViewService';
import { useTopCountriesQuery } from '../features/company/useTopCountriesQuery';
import { InsightsContainer } from './insights';

export const CompanyPage = () => {
  const { t } = useTranslation();
  const { page, contactLinkedinId, companyLinkedinId, companyTabName: activeTabName, url } = useAppState();
  const isWithinLinkedin = useIsWithinLinkedin();

  const companyQuery = useCompanyQuery();
  useTopCountriesQuery();

  const isEmptyState = companyQuery.isSuccess && !companyQuery.data;
  const isLinkedinEmptyState = isEmptyState && isWithinLinkedin;
  const isOtherSiteEmptyState = isEmptyState && !isWithinLinkedin;

  const tabs: Tab<CompanyTabName>[] = useMemo(() => {
    const isContactPage = page === Page.Contact;
    const OverviewComponent = isContactPage ? ContactOverview : CompanyOverview;
    return [
      {
        name: CompanyTabName.Overview,
        label: t('company.overview'),
        iconProps: { iconName: 'search', width: 28 },
        component: () => (
          <OverviewComponent onEmployeesClick={() => appStore.setCompanyTabName(CompanyTabName.Contacts)} />
        ),
      },
      {
        name: CompanyTabName.Insights,
        label: t('company.insights'),
        iconProps: { iconName: 'speaker', colorMethod: 'stroke' },
        component: () => <InsightsContainer />,
      },
      {
        name: CompanyTabName.Contacts,
        label: t('company.contacts'),
        iconProps: { iconName: 'contacts', colorMethod: 'stroke', width: 20 },
        component: () => <Contacts />,
      },
    ];
  }, [page]);

  useEffect(() => {
    appStore.setCompanyTabName(CompanyTabName.Overview);
  }, [contactLinkedinId, companyLinkedinId]);

  const handleSelectTab = (newTab: CompanyTabName) => {
    allTrackers.dispatchTrackEvent(
      'navigation',
      'select tab',
      `${newTab}/${activeTabName}/${TrackingPageViewService.getPageLocation(url)}`
    );
    appStore.setCompanyTabName(newTab);
  };

  return (
    <>
      <Header />
      {isOtherSiteEmptyState && <EmptyStateView />}
      {(!isEmptyState || isLinkedinEmptyState) && (
        <StyledTabsContainer>
          <TabsView<CompanyTabName>
            tabs={tabs}
            onSelect={handleSelectTab}
            activeTabName={activeTabName}
            tabsPosition="top"
            variant="sticky"
          />
        </StyledTabsContainer>
      )}
    </>
  );
};
