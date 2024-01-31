import { QueryFunction, useQuery } from 'react-query';
import { useAppState } from '../../AppStateProvider';
import { HttpClient } from '../../services/HttpClient';
import { CompanyCrmInfo } from '../../domain/company';
import companyQueryKey from './companyQueryKey';

export const useCompanyCrmInfoQuery = (domain: string) => {
  const { isOpen } = useAppState();

  const fetchCompanyCrmInfo: QueryFunction<CompanyCrmInfo, string[]> = ({ queryKey: [, , domain], signal }) => {
    return HttpClient.get<CompanyCrmInfo>(`/sales-extension/api/company/crm-info?domain=${domain}`, {
      signal,
    });
  };

  return useQuery(companyQueryKey.companyCrmInfo(domain), {
    queryFn: fetchCompanyCrmInfo,
    enabled: isOpen && !!domain,
  });
};
