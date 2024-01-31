import React from 'react';
import { useTranslation } from 'react-i18next';
import { SWReactIcons } from '@similarweb/icons';
import { colorsPalettes } from '@similarweb/styles';
import { Header } from '../components/Header';
import { appStore } from '../services/appStore';
import { SettingsFooter } from './settings/SettingsFooter';
import { SettingsBlock } from './settings/SettingsBlock';
import { StyledSettingsPage, StyledSettingsHeader, StyledArrowButton, StyledSettingsTitle } from './styles';

export const SettingsPage = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <StyledSettingsPage data-automation="SettingsPage">
        <div>
          <StyledSettingsHeader>
            <StyledArrowButton onClick={() => appStore.resetSettingsPage()}>
              <SWReactIcons iconName="arrow-left" iconColor={colorsPalettes.carbon[500]} size="xs" />
            </StyledArrowButton>
            {t('header.settings')}
          </StyledSettingsHeader>
          <StyledSettingsTitle>{t('settings.preferences')}</StyledSettingsTitle>
          <SettingsBlock />
        </div>
        <SettingsFooter />
      </StyledSettingsPage>
    </>
  );
};
