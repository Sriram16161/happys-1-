import React, { ReactNode, FC, useEffect, useState } from 'react';
import { useQueryClient } from 'react-query';
import { useTranslation } from 'react-i18next';
import { SWReactIcons } from '@similarweb/icons';
import { HttpClient } from '../../services/HttpClient';
import { CountryService } from '../../services/country';
import { useUserQuery } from '../../features/user/useUserQuery';
import { useAppState } from '../../AppStateProvider';
import { appStore } from '../../services/appStore';
import { LoginScreen } from './LoginScreen';
import { StyledTermsContainer, StyledTermsModal, StyledCloseButton, StyledButton, StyledCheckbox } from './styles';

const HAS_APPROVED_TERMS_KEY = 'hasApprovedTerms';

export const AuthGuard: FC<{ children: ReactNode }> = (props) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const userQuery = useUserQuery();
  const { settingsStorage } = useAppState();
  const [isChecked, setIsChecked] = useState(false);

  const handleClickOnClose = () => {
    window.parent.postMessage({ message: 'close' }, '*');
  };

  const handleApproveTerms = () => {
    window.parent.postMessage({ message: 'set settings storage', key: HAS_APPROVED_TERMS_KEY, value: true }, '*');
    appStore.setSettingsStorageValue({ [HAS_APPROVED_TERMS_KEY]: true });
  };

  useEffect(() => {
    const unregister = HttpClient.registerResponseInterceptor((response) => {
      if (response.status === 401) void userQuery.refetch();

      return Promise.resolve(response);
    });

    return unregister;
  }, []);

  const handleLogin = () => {
    const width = 600;
    const left = screen.width - width;
    const connectedWindow = window.open(
      '/sales-extension/login',
      '_blank',
      `location=0,status=0,titlebar=0,toolbar=0,width=${width}px,height=850px,resizable=yes,left=${left},top=0`
    );

    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      if (!connectedWindow) clearInterval(interval);

      if (connectedWindow?.closed) {
        clearInterval(interval);
        void CountryService.init();
        void queryClient.invalidateQueries();
        void userQuery.refetch();
      }
    }, 500);
  };

  if (userQuery.isError) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  if (userQuery.isLoading || userQuery.isIdle) return <></>;

  if (!settingsStorage.hasApprovedTerms) {
    return (
      <>
        <LoginScreen isTermsPage />
        <StyledTermsContainer>
          <StyledTermsModal>
            <StyledCloseButton onClick={handleClickOnClose}>
              <SWReactIcons iconName="close" size="xs" />
            </StyledCloseButton>
            <StyledCheckbox
              isChecked={isChecked}
              onClick={() => setIsChecked(!isChecked)}
              label={
                <>
                  {t('terms.agree_and_accept')}&nbsp;
                  <a
                    target="_blank"
                    href="https://www.similarweb.com/corp/legal/sales-intelligence-extension-terms-of-service/"
                  >
                    {t('terms.terms_of_use')}
                  </a>
                </>
              }
            />
            <StyledButton disabled={!isChecked} onClick={handleApproveTerms}>
              {t('common.continue')}
            </StyledButton>
          </StyledTermsModal>
        </StyledTermsContainer>
      </>
    );
  }

  return <>{props.children}</>;
};
