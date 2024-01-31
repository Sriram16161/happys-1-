import { formatPercentage, formatWithSuffix } from '../../../services/numberFormat';
import { secondsToHMS } from '../../../services/timeFormat';
import { Insight } from '../../../domain/insight';
import { InsightType } from '../../../domain/insightType';
import { Signal, SignalType, NewsCategory, NewsSignal, AdNetworkChangeType } from '../../../domain/signal';
import { CountryService } from '../../../services/country';

export const getInsightLabel = (insight: Insight) => {
  if (insight.insightType === InsightType.SiteTrends) {
    const { value } = insight.trend.at(-1)!;
    const valueStr = getInsightValue(value, insight.units);
    return `trend ${insight.metric} ${valueStr}`;
  }

  if (insight.insightType === InsightType.Opportunity) {
    const { outperformingCompetitors } = insight;
    let valueStr;
    if (outperformingCompetitors) {
      valueStr = getInsightValue(outperformingCompetitors.opportunity, insight.benchmark.units);
    } else {
      valueStr = getInsightValue(0, insight.benchmark.units);
    }

    return `opportunity ${insight.benchmark.metric} ${valueStr}`;
  }

  if (insight.insightType === InsightType.Signal) {
    return getSignalInsightLabel(insight);
  }

  return 'Unknown insight';
};

const formatMoneyAmount = (amount: number | string) => {
  if (typeof amount === 'string') return amount;
  return `$${formatWithSuffix(amount)}`;
};

const newsSignalLabelMap: Record<NewsCategory, ((signal: NewsSignal) => string) | string> = {
  [NewsCategory.Hires]: ({ jobTitle = '' }) => `hired ${jobTitle}`,
  [NewsCategory.Promotes]: ({ jobTitle = '' }) => `promoted ${jobTitle}`,
  [NewsCategory.Leaves]: ({ jobTitle = '' }) => `${jobTitle} left`,
  [NewsCategory.Retires]: ({ jobTitle = '' }) => `${jobTitle} left`,
  [NewsCategory.Acquires]: ({ relatedCompanyDomain = '' }) => `acquires ${relatedCompanyDomain}`,
  [NewsCategory.MergesWith]: ({ relatedCompanyDomain = '' }) => `merges with ${relatedCompanyDomain}`,
  [NewsCategory.SellsAssetsTo]: ({ relatedCompanyDomain = '' }) => `sells assets to ${relatedCompanyDomain}`,
  [NewsCategory.ExpandsOfficesTo]: ({ location = '' }) => `expands offices to ${location}`,
  [NewsCategory.ExpandsOfficesIn]: ({ location = '' }) => `expands offices in ${location}`,
  [NewsCategory.ExpandsFacilities]: ({ location = '' }) => `expands facilities in ${location}`,
  [NewsCategory.OpensNewLocation]: ({ location = '' }) => `opens office in ${location}`,
  [NewsCategory.IncreasesHeadcountBy]: 'increases headcount',
  [NewsCategory.Launches]: ({ product = '' }) => `launches ${product}`,
  [NewsCategory.IntegratesWith]: ({ relatedCompanyDomain = '' }) => `integrates with ${relatedCompanyDomain}`,
  [NewsCategory.IsDeveloping]: ({ product = '' }) => `is developing ${product}`,
  [NewsCategory.ReceivesFinancing]: ({ amount = 0 }) => `receives financing ${amount}`,
  [NewsCategory.InvestsInto]: ({ relatedCompanyDomain = '', amount = 0 }) =>
    `invests into ${relatedCompanyDomain} ${formatMoneyAmount(amount)}`,
  [NewsCategory.InvestsIntoAssets]: ({ amount = 0 }) => `invests into asset ${formatMoneyAmount(amount)}`,
  [NewsCategory.GoesPublic]: () => 'goes public (IPO)',
  [NewsCategory.ClosesOffices]: ({ location = '' }) => `closes offices in ${location}`,
  [NewsCategory.DecreasesHeadcountBy]: 'decreases headcount',
  [NewsCategory.PartnersWith]: ({ relatedCompanyDomain = '' }) => `partners with ${relatedCompanyDomain}`,
  [NewsCategory.SignsNewClient]: ({ relatedCompanyDomain = '' }) => `signs new client ${relatedCompanyDomain}`,
  [NewsCategory.FilesSuitAgainst]: ({ relatedCompanyDomain = '' }) => `files suit against ${relatedCompanyDomain}`,
  [NewsCategory.HasIssuesWith]: ({ title }) => title,
  [NewsCategory.IdentifiedAsCompetitorOf]: ({ relatedCompanyDomain = '' }) =>
    `identified as competitor of ${relatedCompanyDomain}`,
};

const getSignalInsightLabel = (signal: Signal) => {
  switch (signal.type) {
    case SignalType.News:
      const [category] = signal.categories;
      const labelOrFn = newsSignalLabelMap[category];
      return typeof labelOrFn === 'string' ? labelOrFn : labelOrFn(signal);
    case SignalType.AdNetwork:
      const label =
        signal.changeType === AdNetworkChangeType.StartedWorkingWith ? 'started working with' : 'stopped working with';
      return `${label} ${signal.adNetworkIds.length} ad networks`;
    case SignalType.Technology:
      return `${signal.changeType} ${signal.technologies.join(', ')}`;
    case SignalType.Traffic:
      if ('trafficChanges' in signal.filter) {
        const { metric, direction } = signal.filter.trafficChanges;
        return `${metric} ${direction} by ${formatPercentage(signal.changeValue, 1)}`;
      }

      const { countries } = signal.filter.newMarkets;
      const countriesToShow = 2;
      const countriesPreview = countries
        .slice(0, countriesToShow)
        .map((id) => CountryService.getCountryName(id))
        .join(', ');
      const rest = countries.length > countriesToShow ? `+${countries.length - countriesToShow} countries` : '';
      return `new market in ${countriesPreview} ${rest}`;
    default:
      return 'Unknown signal';
  }
};

const getInsightValue = (value: number, units?: string) => {
  if (units === '%') return formatPercentage(value, 2);
  if (units === 's') return secondsToHMS(value);

  return formatWithSuffix(value, 2);
};
