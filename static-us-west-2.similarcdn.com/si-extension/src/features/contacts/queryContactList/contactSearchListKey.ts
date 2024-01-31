import { QueryKey } from 'react-query';
import { hasLinkedinId } from '../../../domain/contact';
import { AppState } from '../../../services/appStore';
import DataExtractionService from '../../../services/DataExtractionService';

export const CONTACTS_BY_LINKEDIN_IDS_KEY = 'contactsByLinkedinIds';
export const CONTACTS_BY_NAME_KEY = 'contactsByName';

export type ContactSearchListQueryKey = ReturnType<typeof makeContactSearchListKey>;

export const isContactSearchListQueryKey = (queryKey: QueryKey): queryKey is ContactSearchListQueryKey => {
  return [CONTACTS_BY_LINKEDIN_IDS_KEY, CONTACTS_BY_NAME_KEY].includes(queryKey[0] as string);
};

export const makeContactSearchListKey = (appState: AppState) => {
  const { collectedContactsSearchInfo } = appState;
  const hasLinkedinIds = hasLinkedinId(collectedContactsSearchInfo || []);
  if (hasLinkedinIds) {
    const linkedinIds = DataExtractionService.extractContactLinkedinIds(collectedContactsSearchInfo);
    return [CONTACTS_BY_LINKEDIN_IDS_KEY, linkedinIds] as const;
  }

  return [CONTACTS_BY_NAME_KEY, collectedContactsSearchInfo?.map((contact) => contact.name)] as const;
};
