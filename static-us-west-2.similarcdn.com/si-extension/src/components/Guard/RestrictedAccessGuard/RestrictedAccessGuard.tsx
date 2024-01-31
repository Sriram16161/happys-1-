import React, { ReactNode, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { SWReactIcons } from '@similarweb/icons';
import { Page } from '../../../domain/page';
import { useUserQuery } from '../../../features/user/useUserQuery';
import { useIsSwUser } from '../../../hooks/useIsSwUser';
import { usePredefinedPageViewTracking } from '../../../hooks/usePredefinedPageViewTracking';
import { useRequestAccessMutation } from '../../../features/user/useRequestAccessMutation';
import { AssetsService } from '../../../services/AssetsService';
import { CloseExtensionButton } from '../../CloseExtensionButton';
import { useHasRequestedAccess } from './useHasRequestedAccess';
import {
  LockScreenContainer,
  StyledLockScreenImage,
  StyledLockScreenHeading,
  StyledRestrictedAccessText,
  StyledCloseButtonContainer,
  StyledGainAccessButton,
  StyledAccessRequestedHeading,
  StyledAccessRequestedImage,
  StyledAccessRequestedText,
} from '../styles';
import { allTrackers } from '../../../services/tracking/tracking';

const GainAccessView: FC<{ onGainAccessClick(): void }> = (props) => {
  const { t } = useTranslation();

  return (
    <>
      <StyledLockScreenImage
        data-automation="RestrictedScreenImage"
        src={AssetsService.assetUrl('/images/extension-illustration.png')}
        alt="extension"
        variant="restricted"
      />
      <StyledLockScreenHeading data-automation="RestrictedScreenHeading">
        {t('common.sales_intelligence')}
      </StyledLockScreenHeading>
      <StyledRestrictedAccessText data-automation="RestrictedScreenText">
        {t('restricted_access.text')}
      </StyledRestrictedAccessText>
      <StyledGainAccessButton variant="trial" onClick={props.onGainAccessClick}>
        <SWReactIcons iconName="sparkles-gray" size="sm" />
        {t('common.gain_access')}
      </StyledGainAccessButton>
    </>
  );
};

const AccessRequestedView: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      <StyledAccessRequestedImage src={AssetsService.assetUrl('/images/balloons.svg')} alt="balloons" />
      <StyledAccessRequestedHeading>{t('access_requested.title')}</StyledAccessRequestedHeading>
      <StyledAccessRequestedText>{t('access_requested.text')}</StyledAccessRequestedText>
    </>
  );
};

const RestrictedAccessScreen = () => {
  const isSwUser = useIsSwUser();
  const { hasRequestedAccess, setHasRequestedAccess } = useHasRequestedAccess();
  const requestAccessMutation = useRequestAccessMutation();

  usePredefinedPageViewTracking({ page: Page.NoAccess, isSwUser });

  const handleClickOnGainAccess = () => {
    setHasRequestedAccess(true);
    requestAccessMutation.mutate();
    allTrackers.dispatchTrackEvent('hooks', 'request access', 'gain access');
  };

  return (
    <LockScreenContainer variant="restricted">
      <StyledCloseButtonContainer>
        <CloseExtensionButton />
      </StyledCloseButtonContainer>
      {hasRequestedAccess ? <AccessRequestedView /> : <GainAccessView onGainAccessClick={handleClickOnGainAccess} />}
    </LockScreenContainer>
  );
};

export const RestrictedAccessGuard = ({ children }: { children: ReactNode }) => {
  const { data } = useUserQuery();

  if (!data?.isExtensionEnabled) return <RestrictedAccessScreen />;

  return <>{children}</>;
};
