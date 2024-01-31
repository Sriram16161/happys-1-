import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IconName, SWReactIcons } from '@similarweb/icons';
import { colorsPalettes } from '@similarweb/styles';
import { useIsSwUser } from '../../../hooks/useIsSwUser';
import { SettingsModal } from '../../../components/Header/SettingsModal';
import { allTrackers } from '../../../services/tracking/tracking';
import { Button } from '../../../components/Button';
import {
  StyledSettingsLinkContainer,
  StyledSettingsLinkTitle,
  StyledSettingsLinkIcon,
  StyledSettingsFooter,
} from './styles';

export const SettingsFooter = () => {
  const { t } = useTranslation();
  const isSwUser = useIsSwUser();
  const [isInternalSettingsModalOpen, setIsInternalSettingsModalOpen] = useState(false);

  const handleInternalSettingsOpen = () => setIsInternalSettingsModalOpen(true);

  const handleInternalSettingsClose = () => setIsInternalSettingsModalOpen(false);

  const handleAccountClick = () => {
    allTrackers.dispatchTrackEvent(
      'extension top actions',
      'open account settings',
      'extension settings/links/account settings'
    );
  };

  const handleTermsClick = () => {
    allTrackers.dispatchTrackEvent(
      'extension top actions',
      'open terms and conditions',
      'extension settings/links/terms and condition'
    );
  };

  const handleSupportClick = () => {
    allTrackers.dispatchTrackEvent(
      'extension top actions',
      'open knowlege center',
      'extension settings/links/knowledge center'
    );
  };

  const linksConfig: { title: string; icon: IconName; link?: string; onClick: () => void }[] = [
    {
      title: 'settings.account_settings',
      icon: 'settings',
      link: 'https://account.similarweb.com/#/details',
      onClick: handleAccountClick,
    },
    {
      title: 'settings.terms',
      icon: 'company',
      link: 'https://www.similarweb.com/corp/legal/sales-intelligence-extension-terms-of-service/',
      onClick: handleTermsClick,
    },
    {
      title: 'settings.help_center',
      icon: 'helpcenter',
      link: 'https://support.similarweb.com/hc/en-us',
      onClick: handleSupportClick,
    },
  ];

  return (
    <>
      <StyledSettingsFooter>
        {linksConfig.map(({ title, icon, link, onClick }) => (
          <StyledSettingsLinkContainer key={title}>
            <StyledSettingsLinkTitle>
              <SWReactIcons iconName={icon} size="xs" iconColor={colorsPalettes.carbon[250]} />
              <span>{t(title)}</span>
            </StyledSettingsLinkTitle>
            <StyledSettingsLinkIcon href={link} target="_blank" rel="noreferrer" onMouseDown={onClick}>
              <SWReactIcons iconName="open-new-window" size="xs" iconColor={colorsPalettes.blue[500]} />
            </StyledSettingsLinkIcon>
          </StyledSettingsLinkContainer>
        ))}
        {isSwUser && (
          <Button variant="flat" data-automation="SettingsButton" onClick={handleInternalSettingsOpen}>
            Change version
          </Button>
        )}
      </StyledSettingsFooter>
      <SettingsModal onClose={handleInternalSettingsClose} isOpen={isInternalSettingsModalOpen} />
    </>
  );
};
