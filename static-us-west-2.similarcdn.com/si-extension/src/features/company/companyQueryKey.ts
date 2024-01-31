export type CompanyQueryKeyParams = {
  companyLinkedinId?: string;
  domain?: string;
};

const makeTopCountriesQueryKey = ({ companyLinkedinId, domain }: CompanyQueryKeyParams) => [
  'top-countries',
  companyLinkedinId,
  domain?.toLowerCase(),
];

const makeCompanyQueryKey = ({ companyLinkedinId, domain }: CompanyQueryKeyParams) => [
  'company',
  companyLinkedinId,
  domain?.toLowerCase(),
];

const makeCompanyCrmInfoQueryKey = (domain: string) => ['company', 'crm-info', domain?.toLowerCase()];

const companyQueryKey = {
  company: makeCompanyQueryKey,
  topCountries: makeTopCountriesQueryKey,
  companyCrmInfo: makeCompanyCrmInfoQueryKey,
};

export default companyQueryKey;
