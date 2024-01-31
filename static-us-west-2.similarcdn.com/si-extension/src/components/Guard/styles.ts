import styled from 'styled-components';
import { colorsPalettes, setFontVariant } from '@similarweb/styles';
import { SWReactIcons } from '@similarweb/icons';
import { Button } from '../Button';
import { AssetsService } from '../../services/AssetsService';
import { Checkbox } from '../Checkbox';

export const LockScreenContainer = styled.div<{ variant: 'login' | 'restricted' }>`
  width: 100%;
  height: ${({ variant }) => (variant === 'login' ? 'min(100vh, 367px)' : 'min(100vh, 722px)')};
  background-image: ${({ variant }) =>
    `url(${AssetsService.assetUrl(
      variant === 'login' ? '/images/login-bg.png' : '/images/restricted-access-bg.png'
    )})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position-y: bottom;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: ${({ variant }) => (variant === 'login' ? '70px 38px 0 38px' : '126px 38px 0 38px')};
  word-break: break-word;
`;

export const StyledLoginContainer = styled.div`
  max-width: 254px;
  margin: 40px auto 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const StyledLockScreenImage = styled.img<{ variant: 'login' | 'restricted' }>`
  width: 273px;
  margin-bottom: ${({ variant }) => (variant === 'login' ? '32px' : '8px')};
  margin-left: -16px;
`;

export const StyledAccessRequestedImage = styled.img`
  width: 168px;
  height: 168px;
  margin: 80px auto 32px auto;
`;

export const StyledLockScreenHeading = styled.h1`
  margin: 24px 0px 20px;
  ${setFontVariant('h4', colorsPalettes.carbon[400])};
  font-size: 28px;
`;

export const StyledAccessRequestedHeading = styled.h1`
  ${setFontVariant('h4', colorsPalettes.carbon[400])};
  line-height: 20px;
  font-weight: 700;
  margin: 0 -11px 16px -11px;
`;

export const StyledLockScreenText = styled.div`
  ${setFontVariant('h6', colorsPalettes.carbon[300])};
  font-size: 16px;
  font-weight: 100;
  text-align: center;
  margin-bottom: 40px;
`;

export const StyledRestrictedAccessText = styled(StyledLockScreenText)`
  margin-bottom: 32px;
`;

export const StyledAccessRequestedText = styled(StyledLockScreenText)`
  width: 230px;
`;

export const StyledLoginButton = styled(Button)`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 194px;
  min-height: 42px;
  border-radius: 47px;
`;

export const StyledLoginIcon = styled(SWReactIcons)`
  margin-left: 4px;
  fill: ${colorsPalettes.carbon[0]};
`;

export const StyledCloseButtonContainer = styled.div`
  position: fixed;
  top: 6px;
  right: 12px;
`;

export const StyledTermsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: flex-end;
  background: rgba(72, 72, 72, 0.3);
  backdrop-filter: blur(2px);
`;

export const StyledTermsModal = styled.div`
  background-color: ${colorsPalettes.carbon[0]};
  padding: 8px 8px 20px 18px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px 8px 0px 0px;
  box-shadow: 0px 8px 8px 0px rgba(0, 0, 0, 0.24), 0px 0px 8px 0px rgba(0, 0, 0, 0.12);
  width: 100%;
`;

export const StyledCloseButton = styled.button`
  background-color: ${colorsPalettes.carbon[0]};
  border: none;
  box-shadow: none;
  margin-left: auto;
  cursor: pointer;
  border-radius: 50%;
  padding: 6px;
  transition: background-color 0.2s ease-in-out;
  display: inline-flex;
  justify-content: center;
  align-items: center;

  &:hover {
    background-color: ${colorsPalettes.carbon[50]};
  }

  &:active {
    background-color: ${colorsPalettes.blue[100]};

    ${SWReactIcons} svg path {
      fill: ${colorsPalettes.blue[400]};
    }
  }

  ${SWReactIcons} {
    width: 12px;
    height: 12px;
    svg path {
      transition: fill 0.2s ease-in-out;
    }
  }
`;

export const StyledCheckbox = styled(Checkbox)`
  margin: 18px auto 24px 0;
`;

export const StyledButton = styled(Button)`
  padding: 9px 18px;
`;

export const StyledGainAccessButton = styled(Button)`
  display: inline-flex;
  gap: 5px;

  ${SWReactIcons} {
    width: 18px;
    height: 18px;

    svg path {
      fill: ${colorsPalettes.carbon[0]};
    }
  }
`;
