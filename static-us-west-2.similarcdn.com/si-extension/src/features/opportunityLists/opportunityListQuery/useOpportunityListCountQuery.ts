import { useQuery } from 'react-query';
import { useAppState } from '../../../AppStateProvider';
import { opportunityListsApi } from '../api';
import opportunityListQueryKey from './opportunityListQueryKey';

export const useOpportunityListCountQuery = () => {
  const { isOpen } = useAppState();

  return useQuery(opportunityListQueryKey.count(), () => opportunityListsApi.getOpportunityListCount(), {
    enabled: isOpen,
  });
};
