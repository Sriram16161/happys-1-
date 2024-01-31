import React, { FC, useState } from 'react';
import { useUserQuery } from '../../../features/user/useUserQuery';
import { allTrackers } from '../../../services/tracking/tracking';
import TrackingContactsService from '../../../services/tracking/TrackingContactsService';
import {
  Contact,
  hasMatchedProfiles,
  hasPrivateData as checkHasPrivateData,
  PrivateDataType,
} from '../../../domain/contact';
import { PrivateDataView } from './PrivateDataView';
import { PersonaFit } from './PersonaFit';
import { ContactGrade } from './ContactGrade';
import { ContactActionsContainer } from './ContactActionsContainer';
import {
  StyledContactItem,
  StyledContactHeader,
  StyledContactDetails,
  StyledContactName,
  StyledContactTitle,
  StyledContactCountry,
  StyledContactItemContainer,
  StyledContactItemColumn,
  StyledContactActionsContainer,
} from './styles';

export type ContactItemProps = {
  contact: Contact;
  variant?: 'listItem' | 'singular';
  withCompanyName?: boolean;
  isFirstInList?: boolean;
};

export const ContactItem: FC<ContactItemProps> = (props) => {
  const { contact, variant = 'listItem', withCompanyName = false, isFirstInList = false } = props;
  const userQuery = useUserQuery();
  const isGdprRestricted = userQuery.data?.gdprRestricted ?? true;
  const hasPrivateData = checkHasPrivateData(contact) && !isGdprRestricted;
  const [shouldAnimatePrivateDataMount, setShouldAnimatePrivateDataMount] = useState(false);

  const handleCopyClick = (type: PrivateDataType) => {
    allTrackers.dispatchTrackEvent(
      'person data',
      'copy details',
      `${TrackingContactsService.getAvailableContactDetails(contact)}/${type.replace('-', ' ')}/${contact.title}`
    );
  };

  const { salesforceContactUrl, salesforceLeadUrl, hubspotContactUrl } = contact;
  const hasCrmLink = !!(salesforceContactUrl || salesforceLeadUrl || hubspotContactUrl);

  return (
    <StyledContactItem data-contact-id={contact.id || contact.linkedin} variant={variant} data-automation="ContactItem">
      <StyledContactItemContainer>
        <StyledContactHeader hasPrivateData={hasPrivateData} hasCrmLink={hasCrmLink}>
          <StyledContactName data-automation="ContactName">{contact.name}</StyledContactName>
          {contact.accuracyGrade && <ContactGrade grade={contact.accuracyGrade} />}
          {hasMatchedProfiles(contact) && <PersonaFit />}
        </StyledContactHeader>
        <StyledContactItemColumn>
          <StyledContactDetails>
            <StyledContactTitle data-automation="ContactTitle">
              {contact.title}
              {withCompanyName && contact.companyName && ` at ${contact.companyName}`}
            </StyledContactTitle>
            <StyledContactCountry data-automation="ContactCountry">{contact.country}</StyledContactCountry>
          </StyledContactDetails>
          <StyledContactActionsContainer hasPrivateData={hasPrivateData}>
            <ContactActionsContainer
              contact={contact}
              setShouldAnimatePrivateDataMount={setShouldAnimatePrivateDataMount}
              isFirstInList={isFirstInList}
            />
          </StyledContactActionsContainer>
        </StyledContactItemColumn>
      </StyledContactItemContainer>
      {hasPrivateData && (
        <PrivateDataView
          privateData={contact.privateData!}
          animatedMount={shouldAnimatePrivateDataMount}
          key={shouldAnimatePrivateDataMount.toString()}
          increasedFontSize={variant === 'singular'}
          onCopyClick={handleCopyClick}
        />
      )}
    </StyledContactItem>
  );
};
