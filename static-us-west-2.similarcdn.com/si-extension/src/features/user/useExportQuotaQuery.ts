import { useQuery } from 'react-query';
import { useAppState } from '../../AppStateProvider';
import { HttpClient } from '../../services/HttpClient';
import { ExportQuota } from '../../domain/user';
import userQueryKey from './userQueryKey';

export const useExportQuotaQuery = () => {
  const { isOpen } = useAppState();

  return useQuery(userQueryKey.exportQuota(), {
    queryFn: ({ signal }) => {
      return HttpClient.get<ExportQuota>('/sales-extension/api/export/quota', {
        signal,
      });
    },
    enabled: isOpen,
  });
};
