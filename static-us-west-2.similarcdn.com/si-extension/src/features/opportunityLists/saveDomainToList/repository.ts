import { AppStore } from '../../../services/appStore';
import { translate } from '../../../services/i18n';
import { SaveDomainToListRepository } from './useCase';
import { opportunityListsApi } from '../api';
import { queryClient } from '../../../queryClient';
import { OpportunityList } from '../../../domain/list';
import opportunityListQueryKey from '../opportunityListQuery/opportunityListQueryKey';

export const makeSaveDomainToListRepository = (appStore: AppStore): SaveDomainToListRepository => ({
  createList: (name: string) => opportunityListsApi.createOpportunityList(name),
  saveDomainToList: ({ domain, id }: { domain: string; id: string }) => opportunityListsApi.saveToList({ domain, id }),
  notifySaveToListSucceed: () => {
    appStore.setToast({
      icon: 'checked',
      content: translate('company.save_to_list.success'),
    });
  },
  notifySaveToListFailed: () => {
    appStore.setToast({
      icon: 'info',
      content: translate('company.save_to_list.failed'),
    });
  },
  addListToRepository(list: OpportunityList) {
    const queryKey = opportunityListQueryKey.list();
    queryClient.setQueryData<OpportunityList[]>(queryKey, (queryData: OpportunityList[] | undefined) =>
      (queryData || []).concat(list)
    );
  },
  updateListAndCount({ domain, id }: { domain: string; id: string }) {
    const listQueryKey = opportunityListQueryKey.list();

    queryClient.setQueryData<OpportunityList[] | undefined>(
      listQueryKey,
      (listQueryData: OpportunityList[] | undefined) => {
        const isDomainInAnyList = listQueryData?.some((list) => list.domains.includes(domain));

        const countQueryKey = opportunityListQueryKey.count();
        if (!isDomainInAnyList) {
          queryClient.setQueryData<number | undefined>(countQueryKey, (countQueryData: number | undefined) => {
            if (countQueryData) return countQueryData + 1;
          });
        }

        return (
          listQueryData?.map((list) => (list.id === id ? { ...list, domains: [...list.domains, domain] } : list)) || []
        );
      }
    );
  },
});
