import React, { useEffect, useRef } from 'react';
import { CompanyOverview } from './company-overview';
import { ContactItem } from './contacts/ContactItem';
import { CompanyOverviewProps } from './company-overview/CompanyOverview';
import { LoadingView } from '../components/LoadingView';
import { useContactQuery } from '../features/contacts/contactQuery/useContactQuery';
import { Contact, createContact, mergeContact } from '../domain/contact';
import { useAppState } from '../AppStateProvider';
import { appStore } from '../services/appStore';

export const ContactOverview: React.FC<CompanyOverviewProps> = (props) => {
  const contactQuery = useContactQuery();
  const { contactLinkedinId, collectedContactInfo } = useAppState();
  const hasFetchStarted = useRef(contactQuery?.status !== 'idle');

  const isContactQueryEnabled = () => {
    if (!collectedContactInfo) return false;
    if (contactLinkedinId) return true;
    return !!collectedContactInfo.companyLinkedinIds?.length && !!collectedContactInfo?.name;
  };

  useEffect(() => {
    if (contactQuery?.status !== 'idle') {
      hasFetchStarted.current = true;
    }
  }, [contactQuery?.status]);

  if (contactQuery.isLoading || !collectedContactInfo || (!hasFetchStarted.current && isContactQueryEnabled())) {
    return <LoadingView />;
  }

  let contact = mergeContact(contactQuery?.data, collectedContactInfo);

  if (contactQuery.isError || !contact) {
    contact = createContact(collectedContactInfo) as Contact;
    const companyLinkedinIds = collectedContactInfo.companyLinkedinIds;
    if (companyLinkedinIds?.[0]) appStore.setCompanyLinkedinId(companyLinkedinIds?.[0]);
  }

  return (
    <>
      <ContactItem contact={contact} variant="singular" />
      <CompanyOverview onEmployeesClick={props.onEmployeesClick} variant="card" />
    </>
  );
};
