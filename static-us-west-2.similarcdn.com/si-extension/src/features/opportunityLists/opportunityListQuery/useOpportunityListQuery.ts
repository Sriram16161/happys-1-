import { useQuery, UseQueryResult } from 'react-query';
import { opportunityListsApi } from '../api';
import { OpportunityList, OpportunityListTypeEnum } from '../../../domain/list';
import { useAppState } from '../../../AppStateProvider';
import opportunityListQueryKey from './opportunityListQueryKey';

export const useOpportunityListQuery = (): UseQueryResult<OpportunityList[]> => {
  const { isOpen } = useAppState();

  const query = useQuery(
    opportunityListQueryKey.list(),
    async ({ signal }) => {
      const lists = await opportunityListsApi.getOpportunityList(signal);
      return lists.filter((list) => list.type !== OpportunityListTypeEnum.RecentlyViewed);
    },
    { enabled: isOpen, retry: false, refetchInterval: false }
  );

  return query;
};
