import React from 'react';
import { useUserQuery } from '../../features/user/useUserQuery';
import {
  StyledImpersonateContainer,
  StyledImpersonateIcon,
  StyledImpersonateInfo,
  StyledImpersonateText,
  StyledImpersonateTextBold,
} from './styles';
import { colorsPalettes } from '@similarweb/styles';

export const ImpersonateBadge = () => {
  const userQuery = useUserQuery();

  if (!userQuery.data || !userQuery.data.isImpersonate) return null;

  return (
    <StyledImpersonateContainer>
      <StyledImpersonateIcon iconName="sidebar3-impersonate" size="sm" iconColor={colorsPalettes.carbon[400]} />
      <StyledImpersonateInfo>
        <StyledImpersonateText data-automation="ImpersonateText">You are in impersonation mode.</StyledImpersonateText>
        <StyledImpersonateText data-automation="ImpersonateEmail">
          <StyledImpersonateTextBold>User:</StyledImpersonateTextBold>
          {` ${userQuery.data.email}`}
        </StyledImpersonateText>
        <StyledImpersonateText data-automation="ImpersonateAccountType">
          <StyledImpersonateTextBold>Account type:</StyledImpersonateTextBold>
          {` ${userQuery.data.accountType}`}
        </StyledImpersonateText>
      </StyledImpersonateInfo>
    </StyledImpersonateContainer>
  );
};
