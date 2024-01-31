import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatPercentage } from '../../../services/numberFormat';
import { Company } from '../../../domain/company';
import { NoDataView, NoDataViewVariant } from '../NoDataView';
import {
  StyledTrafficShareTable as StyledTrafficShareTable,
  StyledTrafficShareTableHeader as StyledTrafficShareTableHeader,
  StyledTrafficShareTableRow,
  StyledTrafficShareRowName,
  StyledTrafficShareRowValue,
  StyledProgressBar,
} from './styles';

export const ChannelsShareView = ({ company }: { company: Company }) => {
  const { t } = useTranslation();
  const table = [
    { channel: t('company.traffic_share.source.direct'), share: company.directVisitsShare },
    { channel: t('company.traffic_share.source.search'), share: company.organicSearchVisitsShare },
    { channel: t('company.traffic_share.source.referrals'), share: company.referralsVisitsShare },
    { channel: t('company.traffic_share.source.social'), share: company.socialVisitsShare },
    { channel: t('company.traffic_share.source.email'), share: company.mailVisitsShare },
    { channel: t('company.traffic_share.source.display_ads'), share: company.displayadsVisitsShare },
  ].filter(({ share }) => !!share);

  return (
    <>
      {table.length === 0 ? (
        <NoDataView variant={NoDataViewVariant.trafficShare} />
      ) : (
        <StyledTrafficShareTable>
          <StyledTrafficShareTableHeader>
            <span data-automation="TrafficShareChannels">{t('company.traffic_share.channels')}</span>
            <span data-automation="TrafficShareShare">{t('company.traffic_share.share')}</span>
          </StyledTrafficShareTableHeader>
          {table.map(({ channel, share }) => (
            <StyledTrafficShareTableRow key={channel}>
              <StyledTrafficShareRowName data-automation={`TrafficShareChannel-${channel}`}>
                {channel}
              </StyledTrafficShareRowName>
              <StyledTrafficShareRowValue>{formatPercentage(share, 2)}</StyledTrafficShareRowValue>
              <StyledProgressBar progress={formatPercentage(share, 2)} />
            </StyledTrafficShareTableRow>
          ))}
        </StyledTrafficShareTable>
      )}
    </>
  );
};
