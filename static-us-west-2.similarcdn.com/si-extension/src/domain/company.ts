export type Trend = {
  date: string;
  value: number;
};

export type Company = {
  domain: string;
  name: string;
  description?: string;
  employeeRange: string;
  revenueRange: string;
  favicon: string;
  city?: string;
  country: string;
  countryCode: number;
  email: string;
  industry: string;
  visits: number;
  monthlyVisitsChangeMom: number;
  pagesPerVisit: number;
  bounceRate: number;
  avgVisitDuration: number;
  yearMonth: string;
  directVisitsShare: number;
  referralsVisitsShare: number;
  socialVisitsShare: number;
  displayadsVisitsShare: number;
  mailVisitsShare: number;
  organicSearchVisitsShare: number;
  linkedinId?: string;
  totalVisits: {
    metric: string;
    webSource: string;
    trend: Trend[];
  };
};

export type TopCountries = {
  countries: { country: number; share: number; visits: number }[];
};

export type CompanyCrmInfoAccount = {
  companyName: string;
  type: string;
  ownerName: string;
  url: string;
};

export type CompanyCrmInfo = {
  salesforceAccounts: CompanyCrmInfoAccount[];
  hubspotAccounts: CompanyCrmInfoAccount[];
};

export const domainIgnoreList = [
  'bit.ly',
  'goo.gl',
  'tinyurl.com',
  'cutt.ly',
  't.ly',
  'rb.gy',
  'tiny.cc',
  'ow.ly',
  'hubs.ly',
  'hubs.la',
  'sh.st',
  'hubs.li',
  'shorturl.at',
  'surl.li',
  'shorter.me',
  'buff.ly',
  'u.to',
  'bit.do',
  'cutt.us',
  'is.gd',
];
