import { useMutation } from 'react-query';
import { useUseCases } from '../../../UseCaseProvider';
import { OpportunityList } from '../../../domain/list';

export const useSaveDomainToListMutation = () => {
  const { saveDomainToList } = useUseCases();
  return useMutation('save-domain-to-list', ({ domain, list }: { domain: string; list: OpportunityList }) =>
    saveDomainToList({ domain, list })
  );
};
