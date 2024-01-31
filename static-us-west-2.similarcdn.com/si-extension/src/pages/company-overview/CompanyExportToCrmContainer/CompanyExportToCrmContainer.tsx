import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tooltip } from '../../../components/Tooltip';
import { Crm } from '../../../domain/crm';
import { capitalize } from '../../../services/string';
import { useCrmStatusQuery } from '../../../features/crm/useCrmStatusQuery';
import { useUserQuery } from '../../../features/user/useUserQuery';
import { useExportQuotaQuery } from '../../../features/user/useExportQuotaQuery';
import { StyledExportToCrmOption, StyledExportToCrmOptionTitle, StyledExportToCrmOptionQuota } from './styles';

type CompanyExportToCrmContainerProps = {
  crm: Crm;
  onExport: (crm: Crm) => void;
};

export const CompanyExportToCrmContainer = ({ crm, onExport }: CompanyExportToCrmContainerProps) => {
  const { t } = useTranslation();
  const { data: userData } = useUserQuery();
  const { data: crmStatus } = useCrmStatusQuery(crm);
  const { data: exportQuota } = useExportQuotaQuery();

  const isCrmIntegrated = !!crmStatus;
  const isExportEnabled = crmStatus?.isAccountExportEnabled;
  const hasAccessToManageCrm = userData?.hasAccessToManageCrm ?? false;

  const renderExportOption = ({
    href,
    text,
    nonAdminText,
  }: {
    text: string;
    href: string;
    nonAdminText?: string | null;
  }) => (
    <Tooltip
      content={t('company.export_to_crm.disabled.tooltip')}
      enabled={!hasAccessToManageCrm}
      placement="top"
      minWidth={212}
    >
      <StyledExportToCrmOption isDisabled={!hasAccessToManageCrm}>
        {hasAccessToManageCrm ? (
          <a href={href} target="_blank" rel="noreferrer">
            {text}
          </a>
        ) : (
          nonAdminText || text
        )}
      </StyledExportToCrmOption>
    </Tooltip>
  );

  if (!isCrmIntegrated) {
    return renderExportOption({
      href: 'https://pro.similarweb.com/#/sales/management',
      text: t('company.export_to_crm.connect', { crm: capitalize(crm) }),
    });
  }

  if (!isExportEnabled) {
    return renderExportOption({
      href: `https://pro.similarweb.com/#/sales/management/${crm}`,
      text: t('company.export_to_crm.disabled', { crm: capitalize(crm) }),
      nonAdminText: t('company.export_to_crm', { crm: capitalize(crm) }),
    });
  }

  const isOutOfQuota = exportQuota?.remaining ? exportQuota.remaining <= 0 : false;

  const handleExportToCrm = () => {
    if (isOutOfQuota) return;
    onExport(crm);
  };

  return (
    <Tooltip content={t('company.export_to_crm.quota.tooltip')} placement="top" minWidth={244} enabled={isOutOfQuota}>
      <StyledExportToCrmOption isDisabled={isOutOfQuota} onClick={handleExportToCrm}>
        <StyledExportToCrmOptionTitle>
          {t('company.export_to_crm', { crm: capitalize(crm) })}
        </StyledExportToCrmOptionTitle>
        <StyledExportToCrmOptionQuota isDisabled={isOutOfQuota}>
          {exportQuota?.remaining && (
            <>
              {`${t('company.export_to_crm.quota')} `}
              <span>{exportQuota.remaining}</span>
            </>
          )}
        </StyledExportToCrmOptionQuota>
      </StyledExportToCrmOption>
    </Tooltip>
  );
};
