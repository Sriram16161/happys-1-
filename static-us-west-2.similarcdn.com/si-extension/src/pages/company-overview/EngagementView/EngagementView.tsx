import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { IconName } from '@similarweb/icons';
import { formatPercentage, formatWithPrecision } from '../../../services/numberFormat';
import { secondsToTimeString } from '../../../services/timeFormat';
import { Company } from '../../../domain/company';
import { TrafficSection } from '../TrafficSection';
import { MetricIcon } from '../MetricIcon';
import { StyledMetric, StyledMetricName, StyledMetricValue, StyledMetricsContainer } from './styles';

const Metric = ({
  name,
  value,
  format = 'number',
  extraContent,
  iconName,
}: {
  name: string;
  value?: number;
  format?: 'percentage' | 'number' | 'time';
  extraContent?: ReactNode;
  iconName?: IconName;
}) => {
  const formatFn = {
    percentage: formatPercentage,
    number: formatWithPrecision,
    time: secondsToTimeString,
  }[format];

  return (
    <StyledMetric withIcon={!!iconName}>
      {!!iconName && <MetricIcon iconName={iconName} />}
      <StyledMetricName data-automation={`TrafficMetric-${name}`}>{name}</StyledMetricName>
      {!!extraContent && extraContent}
      <StyledMetricValue>{!!value ? formatFn(value, 2) : 'N/A'}</StyledMetricValue>
    </StyledMetric>
  );
};

export const EngagementView = ({ company }: { company: Company }) => {
  const { t } = useTranslation();
  return (
    <TrafficSection company={company} heading={t('company.engagement')} withPadding>
      <StyledMetricsContainer>
        <Metric
          name={t('company.traffic_and_engagement.pages_per_visit')}
          value={company.pagesPerVisit}
          format="number"
          iconName="pages-per-visit"
        />
        <Metric
          name={t('company.traffic_and_engagement.bounce_rate')}
          value={company.bounceRate}
          format="percentage"
          iconName="bounce-rate-2"
        />
        <Metric
          name={t('company.traffic_and_engagement.avg_visit_duration')}
          value={company.avgVisitDuration}
          format="time"
          iconName="daily-usage-per-user"
        />
      </StyledMetricsContainer>
    </TrafficSection>
  );
};
