import { QueryFunction, useQuery, useQueryClient } from 'react-query';
import { useAppState } from '../../AppStateProvider';
import { HttpClient } from '../../services/HttpClient';
import { Company, TopCountries } from '../../domain/company';
import { isNumeric } from '../../services/string';
import companyQueryKey from './companyQueryKey';
import { updateTopCountriesQueryData } from './updateQueryData';

export const useTopCountriesQuery = () => {
  const queryClient = useQueryClient();
  const { isOpen, companyLinkedinId, companyDomain } = useAppState();

  const company = queryClient.getQueryData<Company>(
    companyQueryKey.company({ companyLinkedinId, domain: companyDomain })
  );

  const fetchTopCountries: QueryFunction<TopCountries, (string | undefined)[]> = ({
    queryKey: [, linkedinId, domain],
    signal,
  }) => {
    const searchParams = new URLSearchParams();
    if (domain) searchParams.append('domain', domain);
    if (linkedinId) {
      if (isNumeric(linkedinId)) searchParams.append('numericLinkedinId', linkedinId);
      else searchParams.append('linkedinId', linkedinId);
    }
    return HttpClient.get<TopCountries>(`/sales-extension/api/company/top-countries?${searchParams.toString()}`, {
      signal,
    });
  };

  const handleQuerySuccess = (topCountries?: TopCountries) => {
    if (!topCountries) return;

    if (company) {
      updateTopCountriesQueryData({ companyLinkedinId, company, topCountries, queryClient });
    }
  };

  return useQuery(companyQueryKey.topCountries({ companyLinkedinId, domain: companyDomain }), {
    queryFn: fetchTopCountries,
    enabled: isOpen && !!company && (!!companyLinkedinId || !!companyDomain),
    onSuccess: handleQuerySuccess,
    cacheTime: Infinity,
  });
};
