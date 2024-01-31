import { useMutation } from 'react-query';
import { ContactsToExportPayload, Crm, LeadsToExportPayload } from '../../../domain/crm';
import { useUseCases } from '../../../UseCaseProvider';

export const useExportContactsToCrmMutation = () => {
  const { exportContactsToCrm } = useUseCases();
  return useMutation(
    'export-contacts-to-crm',
    ({
      payload,
      crm,
      onSuccess,
      onError,
    }: {
      payload: ContactsToExportPayload | LeadsToExportPayload;
      crm: Crm;
      onSuccess: () => void;
      onError: () => void;
    }) => exportContactsToCrm({ payload, crm, onSuccess, onError })
  );
};
