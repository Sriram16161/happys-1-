import { AppStore } from '../../../services/appStore';
import { translate } from '../../../services/i18n';
import { Crm } from '../../../domain/crm';
import { ExportQuota, User } from '../../../domain/user';
import { crmApi } from '../api';
import { ExportAccountToCrmRepository } from './useCase';
import companyQueryKey from '../../company/companyQueryKey';
import { queryClient } from '../../../queryClient';
import { CompanyCrmInfo, CompanyCrmInfoAccount } from '../../../domain/company';
import userQueryKey from '../../user/userQueryKey';

export const makeExportAccountToCrmRepository = (appStore: AppStore): ExportAccountToCrmRepository => ({
  exportAccountToCrm: (domain: string, crm: Crm) =>
    crmApi.exportAccount(
      {
        countries: [0],
        domains: [domain],
      },
      crm
    ),
  notifyDomainExportSucceed: () => {
    appStore.setToast({
      icon: 'checked',
      content: translate('company.export_to_crm.success'),
    });
  },
  notifyDomainExportFailed: () => {
    appStore.setToast({
      icon: 'info',
      content: translate('company.export_to_crm.failed'),
    });
  },
  updateCompanyCrmInfo({ crm, domain, externalLink }: { crm: Crm; domain: string; externalLink: string }) {
    const companyCrmInfoQueryKey = companyQueryKey.companyCrmInfo(domain);
    const user = queryClient.getQueryData<User>('user');

    const updateCrmAccounts = (accounts: CompanyCrmInfoAccount[]) => [
      ...accounts,
      {
        url: externalLink,
        companyName: domain,
        ownerName: `${user?.firstName || ''} ${user?.lastName || ''}`,
        type: 'lead',
      },
    ];

    queryClient.setQueryData<CompanyCrmInfo | undefined>(
      companyCrmInfoQueryKey,
      (companyCrmInfoQueryData: CompanyCrmInfo | undefined) => {
        if (!companyCrmInfoQueryData) return;

        const crmAccounts =
          crm === Crm.hubspot ? companyCrmInfoQueryData.hubspotAccounts : companyCrmInfoQueryData.salesforceAccounts;
        const isRepeatedExportToCrm = crmAccounts.some((account) => account.url === externalLink);

        if (isRepeatedExportToCrm) return companyCrmInfoQueryData;

        if (crm === Crm.hubspot) {
          companyCrmInfoQueryData.hubspotAccounts = updateCrmAccounts(crmAccounts);
        } else if (crm === Crm.salesforce) {
          companyCrmInfoQueryData.salesforceAccounts = updateCrmAccounts(crmAccounts);
        }

        queryClient.setQueryData<ExportQuota | undefined>(
          userQueryKey.exportQuota(),
          (quotaQueryData: ExportQuota | undefined) =>
            quotaQueryData
              ? { ...quotaQueryData, remaining: quotaQueryData.remaining - 1, used: quotaQueryData.used + 1 }
              : undefined
        );

        return companyCrmInfoQueryData;
      }
    );
  },
});
