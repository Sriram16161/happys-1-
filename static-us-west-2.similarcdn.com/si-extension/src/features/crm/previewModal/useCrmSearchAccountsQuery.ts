import { useInfiniteQuery, UseInfiniteQueryResult } from 'react-query';
import { crmApi } from '../api';
import { CrmSearchAccountsReturn, Crm } from '../../../domain/crm';

const ACCOUNTS_PER_PAGE = 10;

export const useCrmSearchAccountsQuery = ({
  searchText,
  crm,
  enabled = true,
}: {
  searchText: string;
  crm: Crm;
  enabled?: boolean;
}): UseInfiniteQueryResult<CrmSearchAccountsReturn> => {
  return useInfiniteQuery({
    queryKey: ['crm-search-accounts', searchText, crm],
    queryFn: ({ pageParam }) => {
      return crmApi.searchAccounts({
        after: pageParam as string,
        limit: ACCOUNTS_PER_PAGE.toString(),
        searchText,
        crm,
      });
    },
    getNextPageParam: (lastPage) => (lastPage.next.after < ACCOUNTS_PER_PAGE ? undefined : lastPage.next.after),
    enabled,
  });
};
