import { QueryClient } from 'react-query';
import { Company, TopCountries } from '../../domain/company';
import { isNumeric } from '../../services/string';
import companyQueryKey, { CompanyQueryKeyParams } from './companyQueryKey';

type UpdateCompanyQueryDataParams = {
  companyLinkedinId?: string;
  company: Company;
  queryClient: QueryClient;
};

type QueryKeyGenerator = (params: CompanyQueryKeyParams) => (string | undefined)[];

const makeUpdateQueryDataFunction =
  (keyGenerator: QueryKeyGenerator) =>
  ({
    queryKeyParams,
    data,
    queryClient,
  }: {
    queryKeyParams: CompanyQueryKeyParams;
    data: Company | TopCountries;
    queryClient: QueryClient;
  }): void => {
    const { companyLinkedinId, domain } = queryKeyParams;
    const keysToUpdate = [
      keyGenerator({ companyLinkedinId, domain }),
      keyGenerator({ companyLinkedinId: undefined, domain }),
      keyGenerator({ companyLinkedinId, domain: undefined }),
    ];

    keysToUpdate.forEach((key) => {
      const currentData = queryClient.getQueryData(key);
      if (!currentData) {
        queryClient.setQueryData(key, data);
      }
    });
  };

export const updateCompanyQueryData = ({ companyLinkedinId, queryClient, company }: UpdateCompanyQueryDataParams) => {
  const { linkedinId, domain } = company;
  const updateFunc = makeUpdateQueryDataFunction(companyQueryKey.company);

  if (companyLinkedinId && isNumeric(companyLinkedinId)) {
    updateFunc({ queryKeyParams: { companyLinkedinId, domain }, data: company, queryClient });
  }
  updateFunc({ queryKeyParams: { companyLinkedinId: linkedinId, domain }, data: company, queryClient });
};

export const updateTopCountriesQueryData = ({
  companyLinkedinId,
  queryClient,
  company,
  topCountries,
}: UpdateCompanyQueryDataParams & { topCountries: TopCountries }) => {
  const { linkedinId, domain } = company;
  const updateFunc = makeUpdateQueryDataFunction(companyQueryKey.topCountries);

  if (companyLinkedinId && isNumeric(companyLinkedinId)) {
    updateFunc({ queryKeyParams: { companyLinkedinId, domain }, data: topCountries, queryClient });
  }
  updateFunc({ queryKeyParams: { companyLinkedinId: linkedinId, domain }, data: topCountries, queryClient });
};
