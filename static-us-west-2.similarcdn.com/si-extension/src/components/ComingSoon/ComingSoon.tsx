import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { colorsPalettes } from '@similarweb/styles';
import { AssetsService } from '../../services/AssetsService';
import { allTrackers } from '../../services/tracking/tracking';
import { StyledContainerWithNav } from '../../pages/styles';
import { useUserQuery } from '../../features/user/useUserQuery';
import {
  StyledComingSoonTitle,
  StyledComingSoonDescription,
  StyledComingSoonContainer,
  StyledComingSoonThanksImage,
  StyledComingSoonButton,
  StyledComingSoonIconButton,
} from './styles';
import RocketImage from './RocketImage';

const INSIGHTS_NOTIFICATION_KEY = 'insightsNotification';

export const ComingSoon = () => {
  const { t } = useTranslation();
  const [isThankYouState, setIsThankYouState] = useState(
    !!JSON.parse(window.localStorage.getItem(INSIGHTS_NOTIFICATION_KEY) || 'false')
  );
  const userQuery = useUserQuery();

  const handleClick = () => {
    allTrackers.dispatchTrackEvent('hooks', 'notify me', `coming soon/${userQuery?.data?.email ?? ''}`);
    window.localStorage.setItem(INSIGHTS_NOTIFICATION_KEY, 'true');
    setIsThankYouState(true);
  };

  return (
    <StyledContainerWithNav>
      <StyledComingSoonContainer>
        {isThankYouState ? (
          <>
            <StyledComingSoonThanksImage src={AssetsService.assetUrl('/images/balloons.svg')} />
            <StyledComingSoonTitle>{t('coming_soon.thanks.title')}</StyledComingSoonTitle>
            <StyledComingSoonDescription>{t('coming_soon.thanks.description')}</StyledComingSoonDescription>
          </>
        ) : (
          <>
            <StyledComingSoonTitle>{t('coming_soon.title')}</StyledComingSoonTitle>
            <StyledComingSoonDescription>{t('coming_soon.description')}</StyledComingSoonDescription>
            <StyledComingSoonButton onClick={handleClick} data-automation="notify-button">
              <StyledComingSoonIconButton iconName="email" size="xs" iconColor={colorsPalettes.carbon[0]} />
              {t('coming_soon.button')}
            </StyledComingSoonButton>
            <RocketImage />
          </>
        )}
      </StyledComingSoonContainer>
    </StyledContainerWithNav>
  );
};
