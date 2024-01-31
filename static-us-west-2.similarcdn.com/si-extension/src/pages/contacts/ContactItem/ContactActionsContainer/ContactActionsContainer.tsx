import React, { FC } from 'react';
import { SWReactIcons } from '@similarweb/icons';
import { translate } from '../../../../services/i18n';
import { useUserQuery } from '../../../../features/user/useUserQuery';
import { Contact, hasPrivateData } from '../../../../domain/contact';
import { Tooltip } from '../../../../components/Tooltip';
import { CrmExportActionsContainer } from '../CrmExportActionsContainer';
import { StyledRevealButton } from '../RevealButton/styles';
import { RevealContainer } from '../RevealContainer/RevealContainer';

export type ContactActionsContainerProps = {
  contact: Contact;
  setShouldAnimatePrivateDataMount: (shouldAnimate: boolean) => void;
  isFirstInList: boolean;
};

export const ContactActionsContainer: FC<ContactActionsContainerProps> = (props) => {
  const { contact, isFirstInList } = props;
  const userQuery = useUserQuery();

  const isGdprRestricted = userQuery.data?.gdprRestricted ?? true;

  if (isGdprRestricted) {
    return (
      <Tooltip
        content={translate('contact_card.country_restriction')}
        placement="left"
        minWidth={222}
        className="restricted_reveal"
      >
        <StyledRevealButton data-automation="ContactReveal" disabled hasMobilePhone hasDirectPhone hasEmail>
          <SWReactIcons className="mobile-phone" iconName="mobile-ios" size="xs" />
          <SWReactIcons className="direct-phone" iconName="phone" size="xs" />
          <SWReactIcons className="email" iconName="email" size="xs" />
        </StyledRevealButton>
      </Tooltip>
    );
  }

  if (hasPrivateData(contact)) {
    return <CrmExportActionsContainer contact={contact} isFirstInList={isFirstInList} />;
  }

  return <RevealContainer {...props} />;
};
