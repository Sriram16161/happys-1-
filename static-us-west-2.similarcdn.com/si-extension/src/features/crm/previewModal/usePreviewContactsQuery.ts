import { useQuery } from 'react-query';
import { Contact } from '../../../domain/contact';
import { Crm } from '../../../domain/crm';
import { crmApi } from '../api';

export const usePreviewContactsQuery = ({
  crm,
  contact,
  enabled,
}: {
  crm: Crm;
  contact: Contact;
  enabled: boolean;
}) => {
  return useQuery(
    ['contacts-export-preview', crm, contact.id],
    ({ signal }) => {
      const contacts = [contact];
      return crmApi.exportContactsPreview({ contacts, crm }, signal);
    },
    { enabled }
  );
};
