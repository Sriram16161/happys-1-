import React from 'react';
import { SWReactIcons } from '@similarweb/icons';
import { colorsPalettes } from '@similarweb/styles';
import { translate } from '../../../../services/i18n';
import { useUserQuery } from '../../../../features/user/useUserQuery';
import { Tooltip } from '../../../../components/Tooltip';
import { Crm } from '../../../../domain/crm';
import { StyledCrmExportButton } from '../CrmExportContainer/styles';
import { StyledCrmExportButtonLink } from './styles';

export const InactiveCrmExportButton = ({
  crm,
  handleEnableExportTrack,
  isFirstInList = false,
}: {
  crm?: Crm;
  handleEnableExportTrack: (action: string, role: string) => void;
  isFirstInList?: boolean;
}) => {
  const userQuery = useUserQuery();
  const hasAccessToManageCrm = userQuery.data?.hasAccessToManageCrm ?? false;
  const userRole = userQuery.data?.role ?? '';

  const handleExportClick = () => handleEnableExportTrack('export not enabled', userRole);

  return (
    <Tooltip
      content={translate(
        hasAccessToManageCrm
          ? 'contact_card.export_crm.disabled.tooltip_admin'
          : 'contact_card.export_crm.disabled.tooltip'
      )}
      placement={isFirstInList ? 'left' : 'top-left'}
      minWidth={200}
    >
      {hasAccessToManageCrm ? (
        <StyledCrmExportButton>
          <StyledCrmExportButtonLink
            target="_blank"
            href={
              crm
                ? `https://pro.similarweb.com/#/sales/management/${crm}`
                : `https://pro.similarweb.com/#/sales/management`
            }
            onMouseDown={handleExportClick}
          >
            {!!crm && <SWReactIcons iconName={crm} size="xs" iconColor={colorsPalettes.carbon[500]} />}
            {translate('contact_card.export_crm')}
          </StyledCrmExportButtonLink>
        </StyledCrmExportButton>
      ) : (
        <StyledCrmExportButton disabled onClick={handleExportClick}>
          {!!crm && <SWReactIcons iconName={crm} size="xs" iconColor={colorsPalettes.carbon[200]} />}
          {translate('contact_card.export_crm')}
        </StyledCrmExportButton>
      )}
    </Tooltip>
  );
};
