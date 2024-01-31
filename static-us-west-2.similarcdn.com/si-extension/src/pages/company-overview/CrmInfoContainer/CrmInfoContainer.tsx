import React from 'react';
import { useCompanyCrmInfoQuery } from '../../../features/company/useCompanyCrmInfoQuery';
import { CrmInfoButton } from './CrmInfoButton';
import { Crm } from '../../../domain/crm';

export const CrmInfoContainer = ({ domain }: { domain: string }) => {
  const { data } = useCompanyCrmInfoQuery(domain);

  if (!data) return null;

  const { salesforceAccounts, hubspotAccounts } = data;

  return (
    <>
      {salesforceAccounts?.length > 0 && <CrmInfoButton accounts={salesforceAccounts} crm={Crm.salesforce} />}
      {hubspotAccounts?.length > 0 && <CrmInfoButton accounts={hubspotAccounts} crm={Crm.hubspot} />}
    </>
  );
};
