import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Tab, TabsView } from '../../../components/Tabs';
import { Company } from '../../../domain/company';
import { TrafficSection } from '../TrafficSection';
import { StyledTrafficLoadingView, StyledTrafficTabsContainer } from './styles';
import { CountryShareView } from './CountryShareView';
import { ChannelsShareView } from './ChannelsShareView';
import { useTopCountriesQuery } from '../../../features/company/useTopCountriesQuery';
import { LoadingView } from '../../../components/LoadingView';
import { allTrackers } from '../../../services/tracking/tracking';
import { NoDataView, NoDataViewVariant } from '../NoDataView';

type TrafficShareTab = 'countries' | 'channels';

export const TrafficShareView = ({ company }: { company: Company }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<TrafficShareTab>('countries');

  const topCountriesQuery = useTopCountriesQuery();

  const topCountries = topCountriesQuery.data;

  const handleSelectTab = (tabName: TrafficShareTab) => {
    setActiveTab(tabName);
    allTrackers.dispatchTrackEvent(
      'company data',
      'select traffic share by',
      `traffic share/${tabName}/${company.domain}`
    );
  };

  const TrafficLoadingView = () => (
    <StyledTrafficLoadingView>
      <LoadingView />
    </StyledTrafficLoadingView>
  );

  const tabs: Tab<TrafficShareTab>[] = [
    {
      name: 'countries',
      label: t('company.traffic_share.countries'),
      component: () => {
        if (topCountriesQuery.isLoading) return <TrafficLoadingView />;
        if (!topCountries || topCountriesQuery.isError || topCountries.countries.length === 0) {
          return <NoDataView variant={NoDataViewVariant.trafficShare} />;
        }
        return <CountryShareView company={company} topCountries={topCountries} />;
      },
    },
    {
      name: 'channels',
      label: t('company.traffic_share.channels'),
      component: () => <ChannelsShareView company={company} />,
    },
  ];

  return (
    <TrafficSection company={company} heading={t('company.traffic_share')}>
      <StyledTrafficTabsContainer data-automation="TrafficTabs">
        <TabsView<TrafficShareTab>
          tabsPosition="top"
          variant="compact"
          activeTabName={activeTab}
          onSelect={handleSelectTab}
          tabs={tabs}
        />
      </StyledTrafficTabsContainer>
    </TrafficSection>
  );
};
