import { Contact } from '../../../domain/contact';
import { AppState } from '../../../services/appStore';

export const CONTACT_KEY = 'contact';

const makeContactQueryKeyFromState = ({ contactLinkedinId, collectedContactInfo }: AppState) => {
  const companyIds = collectedContactInfo?.companyLinkedinIds || [];
  let companyNames: string[] = [];
  if (Array.isArray(collectedContactInfo?.companyName)) {
    companyNames = collectedContactInfo?.companyName as string[];
  } else {
    companyNames = [collectedContactInfo?.companyName || ''];
  }
  return [
    CONTACT_KEY,
    contactLinkedinId,
    collectedContactInfo?.name?.toLowerCase(),
    ...companyNames.map((name) => name.toLowerCase()),
    ...companyIds,
  ];
};

const makeContactQueryKeyFromData = (contact: Contact) => {
  const { linkedinId, name, companyName, numericCompanyLinkedinIds = [] } = contact;

  return [
    CONTACT_KEY,
    linkedinId,
    name.toLowerCase(),
    companyName.toLowerCase(),
    ...numericCompanyLinkedinIds.map((id) => id.toString()),
  ];
};

const contactQueryKey = {
  fromState: makeContactQueryKeyFromState,
  fromData: makeContactQueryKeyFromData,
};

export default contactQueryKey;
