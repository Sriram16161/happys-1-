import { QueryFunction, useQuery, useQueryClient } from 'react-query';
import { useAppState } from '../../AppStateProvider';
import { HttpClient } from '../../services/HttpClient';
import { Company } from '../../domain/company';
import { isNumeric } from '../../services/string';
import { appStore } from '../../services/appStore';
import { useHasTimedOut } from '../../hooks/useHasTimedOut';
import companyQueryKey from './companyQueryKey';
import { updateCompanyQueryData } from './updateQueryData';

type UseCompanyQueryParams = { withDelay?: boolean };

export const useCompanyQuery = ({ withDelay = false }: UseCompanyQueryParams = {}) => {
  const queryClient = useQueryClient();
  const { isOpen, companyLinkedinId, companyDomain } = useAppState();

  const fetchCompanyInfo: QueryFunction<Company, (string | undefined)[]> = ({
    queryKey: [, linkedinId, domain],
    signal,
  }) => {
    const searchParams = new URLSearchParams();
    if (domain) searchParams.append('domain', domain);
    if (linkedinId) {
      if (isNumeric(linkedinId)) searchParams.append('numericLinkedinId', linkedinId);
      else searchParams.append('linkedinId', linkedinId);
    }
    return HttpClient.get<Company>(`/sales-extension/api/company/info?${searchParams.toString()}`, { signal });
  };

  const handleQuerySuccess = (company?: Company) => {
    if (!company) return;

    if (!companyDomain?.includes(company.domain)) {
      appStore.setCompanyDomain(company.domain);
    }

    updateCompanyQueryData({ companyLinkedinId, company, queryClient });
  };

  const hasTimedOut = useHasTimedOut({ condition: withDelay, time: 1500 });

  return useQuery(companyQueryKey.company({ companyLinkedinId, domain: companyDomain }), {
    queryFn: fetchCompanyInfo,
    enabled: hasTimedOut && isOpen && (!!companyLinkedinId || !!companyDomain),
    onSuccess: handleQuerySuccess,
    cacheTime: Infinity,
  });
};
