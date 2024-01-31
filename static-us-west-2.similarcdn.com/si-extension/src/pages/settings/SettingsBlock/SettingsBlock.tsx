import React from 'react';
import { useTranslation } from 'react-i18next';
import { colorsPalettes } from '@similarweb/styles';
import { allTrackers } from '../../../services/tracking/tracking';
import { appStore } from '../../../services/appStore';
import { Switch } from '../../../components/Switch';
import {
  StyledSettingsBlock,
  StyledSettingsItem,
  StyledSettingsItemTitle,
  StyledSettingsItemText,
  StyledSettingsItemIcon,
  StyledSettingsItemTextDescription,
} from './styles';

export const AUTO_OPEN_LINKEDIN_KEY = 'autoOpenLinkedin';
export const ENABLE_EVERYWHERE_KEY = 'enableEverywhere';

export const SettingsBlock = () => {
  const { t } = useTranslation();

  const isAutoOpenLinkedin = !!appStore.getSettingsStorageValue(AUTO_OPEN_LINKEDIN_KEY);
  const isEnableEverywhere = !!appStore.getSettingsStorageValue(ENABLE_EVERYWHERE_KEY);

  const handleAutoOpenLinkedinClick = () => {
    allTrackers.dispatchTrackEvent(
      'extension top actions',
      isAutoOpenLinkedin ? 'disable auto open' : 'enable auto open',
      `extension settings/auto open/${isAutoOpenLinkedin ? 'disable' : 'enable'}`
    );
    window.parent.postMessage(
      { message: 'set settings storage', key: AUTO_OPEN_LINKEDIN_KEY, value: !isAutoOpenLinkedin },
      '*'
    );
    appStore.setSettingsStorageValue({ [AUTO_OPEN_LINKEDIN_KEY]: !isAutoOpenLinkedin });
  };

  const handleEnableEverywhereClick = () => {
    allTrackers.dispatchTrackEvent(
      'extension top actions',
      isEnableEverywhere ? 'disable everywhere' : 'enable everywhere',
      `extension settings/si everywhere/${isEnableEverywhere ? 'disable' : 'enable'}`
    );
    window.parent.postMessage(
      { message: 'set settings storage', key: ENABLE_EVERYWHERE_KEY, value: !isEnableEverywhere },
      '*'
    );
    appStore.setSettingsStorageValue({ [ENABLE_EVERYWHERE_KEY]: !isEnableEverywhere });
  };

  return (
    <StyledSettingsBlock>
      <StyledSettingsItem>
        <StyledSettingsItemTitle>
          <StyledSettingsItemIcon iconName="arrows-vector" size="xs" iconColor={colorsPalettes.carbon[500]} />
          <StyledSettingsItemText>{t('settings.auto_open_linkedin')}</StyledSettingsItemText>
        </StyledSettingsItemTitle>
        <Switch isSelected={isAutoOpenLinkedin} onClick={handleAutoOpenLinkedinClick} />
      </StyledSettingsItem>
      <StyledSettingsItem>
        <StyledSettingsItemTitle>
          <StyledSettingsItemIcon iconName="global-rank" size="xs" iconColor={colorsPalettes.carbon[500]} />
          <div>
            <StyledSettingsItemText>{t('settings.enable_everywhere')}</StyledSettingsItemText>
            <StyledSettingsItemTextDescription>
              {t('settings.enable_everywhere_description')}
            </StyledSettingsItemTextDescription>
          </div>
        </StyledSettingsItemTitle>
        <Switch isSelected={isEnableEverywhere} onClick={handleEnableEverywhereClick} />
      </StyledSettingsItem>
    </StyledSettingsBlock>
  );
};
