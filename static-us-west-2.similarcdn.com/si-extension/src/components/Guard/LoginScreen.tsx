import React from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '../../domain/page';
import { usePredefinedPageViewTracking } from '../../hooks/usePredefinedPageViewTracking';
import { AssetsService } from '../../services/AssetsService';
import { CloseExtensionButton } from '../CloseExtensionButton';
import {
  StyledLoginContainer,
  StyledLockScreenHeading,
  StyledLockScreenText,
  StyledLoginButton,
  StyledLoginIcon,
  StyledLockScreenImage,
  LockScreenContainer,
  StyledCloseButtonContainer,
} from './styles';

export const LoginScreen = ({ onLogin, isTermsPage }: { onLogin?: () => void; isTermsPage?: boolean }) => {
  const { t } = useTranslation();

  usePredefinedPageViewTracking({ page: isTermsPage ? Page.Terms : Page.Login, isSwUser: false });

  return (
    <LockScreenContainer variant="login">
      <StyledCloseButtonContainer>
        <CloseExtensionButton />
      </StyledCloseButtonContainer>
      <StyledLockScreenImage
        variant="login"
        data-automation="LockScreenImage"
        src={AssetsService.assetUrl('/images/extension-illustration.png')}
        alt="extension"
      />
      <StyledLoginContainer>
        <StyledLockScreenHeading>{`${t('login.heading')} \u{1F44B}`}</StyledLockScreenHeading>
        <StyledLockScreenText data-automation="LockScreenText">{t('login.text')}</StyledLockScreenText>
        <StyledLoginButton data-automation="LockScreenButton" onClick={onLogin}>
          {t('login.button')}
          <StyledLoginIcon iconName="open-new-window" size="xs" />
        </StyledLoginButton>
      </StyledLoginContainer>
    </LockScreenContainer>
  );
};
