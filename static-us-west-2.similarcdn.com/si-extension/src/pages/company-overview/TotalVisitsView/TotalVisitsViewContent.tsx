import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useTranslation } from 'react-i18next';
import { colorsPalettes } from '@similarweb/styles';
import { Trend } from '../../../domain/company';
import { formatPercentage, formatWithSuffixWithMinimum } from '../../../services/numberFormat';
import { useTotalVisitsChart } from './useTotalVisitsChart';
import {
  StyledTotalVisitsInfo,
  StyledTotalVisitsInfoBold,
  StyledTotalVisitsDate,
  StyledArrowIcon,
  StyledTotalVisitsInfoRow,
  StyledChangeValue,
  StyledTotalVisitsChart,
} from './styles';

export const TotalVisitsViewContent = ({ data }: { data: Trend[] }) => {
  const { t } = useTranslation();

  const { value, chartOptions, startDate, endDate } = useTotalVisitsChart(data);

  const { y: totalVisits, date, prevDate, change } = value;

  return (
    <>
      <StyledTotalVisitsInfo>
        <StyledTotalVisitsInfoRow>
          <StyledTotalVisitsInfoBold>{formatWithSuffixWithMinimum(totalVisits, 1)}</StyledTotalVisitsInfoBold>
          {date}
        </StyledTotalVisitsInfoRow>
        <StyledTotalVisitsInfoRow>
          <StyledArrowIcon
            iconName={change > 0 ? 'arrow-up-grey' : 'arrow-down-grey'}
            iconColor={change > 0 ? colorsPalettes.green.s100 : colorsPalettes.red.s100}
            size="xs"
          />
          <StyledChangeValue variant={change > 0 ? 'green' : 'red'}>{formatPercentage(change, 2)}</StyledChangeValue>
          {`${t('company.from')} ${prevDate}`}
        </StyledTotalVisitsInfoRow>
      </StyledTotalVisitsInfo>
      <StyledTotalVisitsChart>
        <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        <StyledTotalVisitsDate>
          <span>{startDate}</span>
          <span>{endDate}</span>
        </StyledTotalVisitsDate>
      </StyledTotalVisitsChart>
    </>
  );
};
