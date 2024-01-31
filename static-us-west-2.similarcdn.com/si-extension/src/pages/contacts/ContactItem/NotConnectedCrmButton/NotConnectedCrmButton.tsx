import React, { useState } from 'react';
import { SWReactIcons } from '@similarweb/icons';
import { colorsPalettes } from '@similarweb/styles';
import { translate } from '../../../../services/i18n';
import { useUserQuery } from '../../../../features/user/useUserQuery';
import { Tooltip } from '../../../../components/Tooltip';
import { Dropdown } from '../../../../components/Dropdown';
import { StyledCrmExportButton } from '../CrmExportContainer/styles';
import { StyledCrmExportMenu, StyledCrmExportMenuItem, StyledCrmExportMenuLink } from './styles';

export const NotConnectedCrmButton = ({
  handleEnableExportTrack,
}: {
  handleEnableExportTrack: (action: string, role: string) => void;
}) => {
  const userQuery = useUserQuery();
  const hasAccessToManageCrm = userQuery.data?.hasAccessToManageCrm ?? false;
  const userRole = userQuery.data?.role ?? '';

  const [isDropdownOpened, setIsDropdownOpened] = useState(false);

  const handleExportClick = () => {
    handleEnableExportTrack('not integrated', userRole);
    setIsDropdownOpened(true);
  };

  return (
    <>
      <StyledCrmExportButton onClick={handleExportClick} isActive={isDropdownOpened}>
        {translate('contact_card.export_crm')}
      </StyledCrmExportButton>
      <Dropdown isOpened={isDropdownOpened} onClose={() => setIsDropdownOpened(false)} placement="right" minWidth={208}>
        {hasAccessToManageCrm ? (
          <StyledCrmExportMenu>
            <StyledCrmExportMenuItem>
              <SWReactIcons iconName="salesforce" size="xs" iconColor={colorsPalettes.carbon[200]} />
              <StyledCrmExportMenuLink target="_blank" href="https://pro.similarweb.com/#/sales/management">
                {translate('contact_card.connect_sf')}
              </StyledCrmExportMenuLink>
            </StyledCrmExportMenuItem>
            <StyledCrmExportMenuItem>
              <SWReactIcons iconName="hubspot" size="xs" iconColor={colorsPalettes.carbon[200]} />
              <StyledCrmExportMenuLink target="_blank" href="https://pro.similarweb.com/#/sales/management">
                {translate('contact_card.connect_hs')}
              </StyledCrmExportMenuLink>
            </StyledCrmExportMenuItem>
          </StyledCrmExportMenu>
        ) : (
          <Tooltip content={translate('contact_card.connect_crm.disabled.tooltip')} placement="top" minWidth={212}>
            <StyledCrmExportMenu>
              <StyledCrmExportMenuItem isDisabled>
                <SWReactIcons iconName="salesforce" size="xs" iconColor={colorsPalettes.carbon[200]} />
                {translate('contact_card.connect_sf')}
              </StyledCrmExportMenuItem>
              <StyledCrmExportMenuItem isDisabled>
                <SWReactIcons iconName="hubspot" size="xs" iconColor={colorsPalettes.carbon[200]} />
                {translate('contact_card.connect_hs')}
              </StyledCrmExportMenuItem>
            </StyledCrmExportMenu>
          </Tooltip>
        )}
      </Dropdown>
    </>
  );
};
