import { useQuery } from 'react-query';
import { useAppState } from '../../AppStateProvider';
import { Crm, CrmStatus } from '../../domain/crm';
import { crmApi } from './api';

export const useCrmStatusQuery = (crm: Crm) => {
  const { isOpen } = useAppState();

  return useQuery<CrmStatus>(['status', crm], () => crmApi.fetchCrmStatus(crm), {
    enabled: isOpen,
  });
};
