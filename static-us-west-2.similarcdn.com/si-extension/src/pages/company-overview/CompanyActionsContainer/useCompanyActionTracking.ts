import { Crm } from '../../../domain/crm';
import { OpportunityList } from '../../../domain/list';
import { useCrmStatusQuery } from '../../../features/crm/useCrmStatusQuery';
import { useOpportunityListCountQuery } from '../../../features/opportunityLists/opportunityListQuery/useOpportunityListCountQuery';
import { useExportQuotaQuery } from '../../../features/user/useExportQuotaQuery';
import { allTrackers } from '../../../services/tracking/tracking';
import { MAX_DOMAINS_COUNT } from './CompanyActionsContainer';

const getEventSubName = (isHsEnabled: boolean, isSfEnabled: boolean) => {
  if (isHsEnabled && isSfEnabled) {
    return `${Crm.salesforce}, ${Crm.hubspot}`;
  }
  return isHsEnabled ? Crm.hubspot : Crm.salesforce;
};

export const useCompanyActionTracking = () => {
  const { data: exportQuota } = useExportQuotaQuery();
  const { data: hsStatus } = useCrmStatusQuery(Crm.hubspot);
  const { data: sfStatus } = useCrmStatusQuery(Crm.salesforce);
  const { data: uniqueDomainsCount = 0 } = useOpportunityListCountQuery();
  const remainingDomainsCount = MAX_DOMAINS_COUNT - uniqueDomainsCount;

  const getStatus = () => {
    const isHsAccountExportEnabled = !!hsStatus?.isAccountExportEnabled;
    const isSfAccountExportEnabled = !!sfStatus?.isAccountExportEnabled;

    if (isHsAccountExportEnabled || isSfAccountExportEnabled) {
      return `account export active/${getEventSubName(isHsAccountExportEnabled, isSfAccountExportEnabled)}`;
    }

    if (!!hsStatus || !!sfStatus) {
      return `account export inactive/${getEventSubName(!!hsStatus, !!sfStatus)}`;
    }

    return 'crm not integrated';
  };

  const handleTrackAction = (action: string, eventName: string) => {
    allTrackers.dispatchTrackEvent('company export', action, eventName);
  };

  const handleTrackOpenDropdown = () => {
    handleTrackAction('open export to options', getStatus());
  };

  const handleTrackExportAction = (action: string, crm: Crm) => {
    handleTrackAction(action, `export to ${crm}/${exportQuota?.remaining ?? 0}`);
  };

  const handleTrackListAction = (action: string, eventName: string) => {
    handleTrackAction(action, `${eventName}/${uniqueDomainsCount}/${remainingDomainsCount}`);
  };

  const handleTrackOnSaveToList = ({ name, id }: OpportunityList) => {
    handleTrackAction('save to list', `${id ? 'existing list' : 'new list'}/${name}/${remainingDomainsCount}`);
  };

  return {
    handleTrackOpenDropdown,
    handleTrackListAction,
    handleTrackOnSaveToList,
    handleTrackExportAction,
  };
};
