import { useMutation } from 'react-query';
import { Crm } from '../../../domain/crm';
import { useUseCases } from '../../../UseCaseProvider';

export const useExportAccountToCrmMutation = () => {
  const { exportAccountToCrm } = useUseCases();
  return useMutation(
    'export-account-to-crm',
    ({ domain, crm, onSuccess, onError }: { domain: string; crm: Crm; onSuccess?: () => void; onError?: () => void }) =>
      exportAccountToCrm({ domain, crm, onSuccess, onError })
  );
};
