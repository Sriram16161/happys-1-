import React from 'react';
import { SWReactIcons } from '@similarweb/icons';
import { StyledScrollInfo, StyledScrollInfoText } from './styles';
import { useTranslation } from 'react-i18next';

export const ScrollInfo = () => {
  const { t } = useTranslation();
  return (
    <StyledScrollInfo>
      <SWReactIcons iconName="social-linkedin" size="sm" />
      <StyledScrollInfoText>{t('contacts.scroll_info')}</StyledScrollInfoText>
    </StyledScrollInfo>
  );
};
