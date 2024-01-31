import React, { FC } from 'react';
import { SWReactIcons } from '@similarweb/icons';
import { translate } from '../../../../services/i18n';
import { useUserQuery } from '../../../../features/user/useUserQuery';
import { isOutOfQuota } from '../../../../domain/user';
import { StyledRevealButton, StyledTooltip } from './styles';

export type RevealButtonProps = {
  hasMobilePhone: boolean;
  hasDirectPhone: boolean;
  hasEmail: boolean;
  className?: string;
  onClick?(): void;
  isLoading?: boolean;
};

export const RevealButton: FC<RevealButtonProps> = (props) => {
  const userQuery = useUserQuery();
  const hasRemainingQuota = !!userQuery.data && !isOutOfQuota(userQuery.data);
  const tooltipKey = hasRemainingQuota ? 'contact_card.reveal_contact' : 'contact_card.no_credits';

  return (
    <StyledTooltip content={translate(tooltipKey)} placement="left" wide={!hasRemainingQuota}>
      <StyledRevealButton
        data-automation="ContactReveal"
        disabled={!hasRemainingQuota}
        hasMobilePhone={props.hasMobilePhone}
        hasDirectPhone={props.hasDirectPhone}
        hasEmail={props.hasEmail}
        className={props.className}
        onClick={props.onClick}
        isLoading={props.isLoading}
      >
        <SWReactIcons className="mobile-phone" iconName="mobile-ios" size="xs" />
        <SWReactIcons className="direct-phone" iconName="phone" size="xs" />
        <SWReactIcons className="email" iconName="email" size="xs" />
      </StyledRevealButton>
    </StyledTooltip>
  );
};
