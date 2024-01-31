import React, { FC } from 'react';
import { SWReactIcons } from '@similarweb/icons';
import { isOutOfQuota } from '../../domain/user';
import { useUserQuery } from '../../features/user/useUserQuery';
import { allTrackers } from '../../services/tracking/tracking';
import { translate } from '../../services/i18n';
import { appStore } from '../../services/appStore';
import { useAppState } from '../../AppStateProvider';
import { Page } from '../../domain/page';
import { CloseExtensionButton } from '../CloseExtensionButton';
import { SWLOGO } from './SWLogo';
import {
  StyledHeader,
  StyledCredits,
  StyledCreditsValue,
  StyledLogoImage,
  StyledTooltip,
  StyledSettingsButton,
} from './styles';

export const Header: FC = () => {
  const { page } = useAppState();
  const handleSettingsClick = () => {
    appStore.setSettingsPage();
    allTrackers.dispatchTrackEvent('extension top actions', 'open settings', 'extension settings');
  };

  const userQuery = useUserQuery();

  return (
    <>
      <StyledHeader data-automation="Header">
        <StyledLogoImage>
          <SWLOGO data-automation="HeaderLogo" />
        </StyledLogoImage>
        {userQuery.data ? (
          <StyledTooltip
            content={translate('header.credits.tooltip')}
            placement="bottom"
            enabled={isOutOfQuota(userQuery.data)}
          >
            <StyledCredits data-automation="Credits">{translate('header.credits')}</StyledCredits>
            <StyledCreditsValue data-automation="CreditsValue">
              {userQuery.data.contactsQuota.remaining}
            </StyledCreditsValue>
          </StyledTooltip>
        ) : (
          <span>Loading user quota...</span>
        )}
        <StyledSettingsButton
          data-automation="SettingsButton"
          isDisabled={page === Page.Settings}
          onClick={page === Page.Settings ? undefined : handleSettingsClick}
        >
          <SWReactIcons iconName="settings" size="xs" />
        </StyledSettingsButton>

        <CloseExtensionButton />
      </StyledHeader>
    </>
  );
};
