import { InsightType } from './insightType';

type BaseSignal = { eventHappenedDaysAgo: number; insightType: InsightType.Signal; id: string };

export enum SignalType {
  AdNetwork = 'adNetwork',
  Technology = 'technology',
  Traffic = 'traffic',
  News = 'news',
  Intent = 'intent',
}

export enum NewsCategory {
  Hires = 'hires',
  Promotes = 'promotes',
  Leaves = 'leaves',
  Retires = 'retires_from',
  Acquires = 'acquires',
  MergesWith = 'merges_with',
  SellsAssetsTo = 'sells_assets_to',
  ExpandsOfficesTo = 'expands_offices_to',
  ExpandsOfficesIn = 'expands_offices_in',
  ExpandsFacilities = 'expands_facilities',
  OpensNewLocation = 'opens_new_location',
  IncreasesHeadcountBy = 'increases_headcount_by',
  Launches = 'launches',
  IntegratesWith = 'integrates_with',
  IsDeveloping = 'is_developing',
  ReceivesFinancing = 'receives_financing',
  InvestsInto = 'invests_into',
  InvestsIntoAssets = 'invests_into_assets',
  GoesPublic = 'goes_public',
  ClosesOffices = 'closes_offices_in',
  DecreasesHeadcountBy = 'decreases_headcount_by',
  PartnersWith = 'partners_with',
  SignsNewClient = 'signs_new_client',
  FilesSuitAgainst = 'files_suit_against',
  HasIssuesWith = 'has_issues_with',
  IdentifiedAsCompetitorOf = 'identified_as_competitor_of',
}

export type NewsSignal = BaseSignal & {
  type: SignalType.News;
  categories: NewsCategory[];
  url: string;
  articleSentence: string;
  title: string;
  jobTitle?: string;
  location?: string;
  relatedCompanyDomain?: string;
  product?: string;
  financingType?: string;
  amount?: string;
};

export enum AdNetworkChangeType {
  StartedWorkingWith = 'startedWorkingWith',
  StoppedWorkingWith = 'stoppedWorkingWith',
}

export type AdNetworkSignal = BaseSignal & {
  type: SignalType.AdNetwork;
  changeType: AdNetworkChangeType;
  adNetworkIds: number[];
};

export enum TechnologyChangesType {
  Added = 'Added',
  Removed = 'Removed',
  Renew = 'Renew',
}

export enum TechnologySignalSubType {
  AddedTechnologies = 'AddedTechnologies',
  AddedIntegrations = 'AddedIntegrations',
  RemovedTechnologies = 'RemovedTechnologies',
  RemovedIntegrations = 'RemovedIntegrations',
  RemovedMyTechnologies = 'RemovedMyTechnologies',
}

export type TechnologySignal = BaseSignal & {
  changeType: TechnologyChangesType;
  technologies: string[];
  periodDays?: number;
  type: SignalType.Technology;
  subType?: TechnologySignalSubType;
};

type TrafficChangesFilter = {
  trafficChanges: {
    country: number;
    direction: 'grew' | 'declined';
    metric: string;
    period: 'mom' | 'yoy';
    value: number;
  };
};

type NewMarketsFilter = {
  newMarkets: {
    countries: number[];
    metric: string;
    thresholdValue: number;
  };
};

export type TrafficSignal = BaseSignal & {
  type: SignalType.Traffic;
  changeValue: number;
  subType: 'Month' | 'Year';
  filter: TrafficChangesFilter | NewMarketsFilter;
};

export type Signal = NewsSignal | AdNetworkSignal | TechnologySignal | TrafficSignal;
