import { Crm, ExportToCrmReturn } from '../../../domain/crm';

export interface ExportAccountToCrmRepository {
  exportAccountToCrm(domain: string, crm: Crm): Promise<ExportToCrmReturn>;
  notifyDomainExportSucceed(): void;
  notifyDomainExportFailed(): void;
  updateCompanyCrmInfo({ crm, domain, externalLink }: { crm: Crm; domain: string; externalLink: string }): void;
}

export type exportAccountToCrmUseCase = ({
  domain,
  crm,
  onSuccess,
  onError,
}: {
  domain: string;
  crm: Crm;
  onSuccess?: () => void;
  onError?: () => void;
}) => Promise<void>;

export const makeExportAccountToCrmUseCase =
  (repository: ExportAccountToCrmRepository): exportAccountToCrmUseCase =>
  async ({ domain, crm, onSuccess = () => null, onError = () => null }) => {
    try {
      const result = await repository.exportAccountToCrm(domain, crm);

      if (result?.inProgressRecords > 0) return;

      if (result?.processedRecords === 1) {
        repository.notifyDomainExportSucceed();
        onSuccess();

        const { externalLink } = result.succeededLinks[0];
        if (externalLink) {
          repository.updateCompanyCrmInfo({ crm, domain, externalLink });
        }
      } else {
        throw new Error('Failed to export domain to CRM');
      }
    } catch (error) {
      onError();
      repository.notifyDomainExportFailed();
    }
  };
