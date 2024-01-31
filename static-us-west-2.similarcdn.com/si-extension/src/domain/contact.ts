import { Country } from './country';

export type Contact = {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  linkedin: string;
  linkedinId?: string;
  country: string;
  role: string;
  site: string;
  originalSite: string;
  department: string;
  seniority: string;
  title: string;
  companyName: string;
  companyId: string;
  companyLinkedinId?: string;
  numericCompanyLinkedinIds?: number[];
  hasValidEmails: boolean;
  hasMobilePhoneNumbers: boolean;
  hasDirectPhoneNumbers: boolean;
  isRevealed: boolean;
  privateData?: PrivateData;
  matchedProfiles: string[];
  accuracyGrade?: string;
  salesforceContactUrl?: string;
  salesforceLeadUrl?: string;
  hubspotContactUrl?: string;
};

export type PrivateData = {
  phoneNumbers?: { score: number; number: string; numberType: string; internalType: 'mobile' | 'direct' }[];
  emails?: string[];
  linkedInUrl: string;
  requester: { userId: number; accountId: number; name: string; email: string };
  lastUpdated: string;
  revealErrors?: {
    hasValidEmailsError: boolean;
    hasDirectPhoneNumbersError: boolean;
    hasMobilePhoneNumbersError: boolean;
  };
};

export type PrivateDataType = 'email' | 'direct-phone' | 'mobile-phone';

export enum ContactDetail {
  phone = 'phone',
  email = 'email',
  both = 'both',
}

export type ContactStatusFilterValue = Partial<{
  notRevealed: boolean;
  exported: boolean;
  notExported: boolean;
}>;

export type CollectedContactInfo = Partial<{
  country: string;
  title: string;
  companyLinkedinIds: string[];
  name: string;
  companyName: string | string[];
}>;

export type ContactsCountByCountry = { country: Country; contactsCount: number };

export const hasPrivateData = ({ privateData }: Contact): boolean =>
  Boolean(privateData?.emails?.length || privateData?.phoneNumbers?.length);

export const hasDataToReveal = ({ hasDirectPhoneNumbers, hasMobilePhoneNumbers, hasValidEmails }: Contact): boolean =>
  hasDirectPhoneNumbers || hasMobilePhoneNumbers || hasValidEmails;

export const revealContact = (contact: Contact, privateData: PrivateData | undefined): Contact => {
  return { ...contact, isRevealed: true, privateData };
};

export const hasMatchedProfiles = (contact: Contact): boolean =>
  contact.matchedProfiles && contact.matchedProfiles.length > 0;

export const mergeContact = (
  contact: Contact | undefined,
  collectedContactInfo: CollectedContactInfo | undefined
): Contact | undefined => {
  if (!contact) return undefined;
  const mergedContact = { ...contact };

  if (collectedContactInfo?.country) {
    mergedContact.country = collectedContactInfo.country;
  }

  if (collectedContactInfo?.title) {
    mergedContact.title = collectedContactInfo.title;
  }

  return mergedContact;
};

export const createContact = (collectedContactInfo: CollectedContactInfo | undefined): Partial<Contact> => {
  const contact = {
    name: '',
    title: '',
    country: '',
    matchedProfiles: [],
    hasDirectPhoneNumbers: false,
    hasMobilePhoneNumbers: false,
    hasValidEmails: false,
  };

  if (collectedContactInfo?.name) {
    contact.name = collectedContactInfo.name;
  }

  if (collectedContactInfo?.country) {
    contact.country = collectedContactInfo.country;
  }

  if (collectedContactInfo?.title) {
    contact.title = collectedContactInfo.title;
  }

  return contact;
};

export const hasLinkedinId = (contact: Partial<Contact>[]) => contact.some((contact) => !!contact.linkedin);
