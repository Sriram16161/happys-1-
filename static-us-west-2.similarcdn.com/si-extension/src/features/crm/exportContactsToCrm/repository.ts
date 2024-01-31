import { Contact } from '../../../domain/contact';
import { AppStore } from '../../../services/appStore';
import { ExportContactsToCrmRepository } from './useCase';
import { translate } from '../../../services/i18n';
import { ContactsToExportPayload, Crm, LeadsToExportPayload } from '../../../domain/crm';
import { crmApi } from '../api';
import { ContactRepository } from '../../contacts/repository';

export const makeExportContactsToCrmRepository = (
  appStore: AppStore,
  contactRepository: ContactRepository
): ExportContactsToCrmRepository => ({
  exportAsContacts: (payload: ContactsToExportPayload, crm: Crm) => crmApi.exportAsContacts(payload, crm),
  exportAsLeads: (payload: LeadsToExportPayload) => crmApi.exportAsLeads(payload),
  notifyContactsExportSucceed: () => {
    appStore.setToast({
      icon: 'checked',
      content: translate('contacts.contact.export_to_crm.success'),
    });
  },
  notifyContactsExportFailed: () => {
    appStore.setToast({
      icon: 'info',
      content: translate('contacts.contact.export_to_crm.failed'),
    });
  },
  updateContact: (
    contactId: string,
    linkObject: Pick<Contact, 'hubspotContactUrl' | 'salesforceLeadUrl' | 'salesforceContactUrl'>
  ) => {
    const contact = contactRepository.getContactById(contactId);
    if (!contact) {
      console.error(`Contact with id ${contactId} not found`);
      return;
    }

    contactRepository.saveContact({ ...contact, ...linkObject });
  },
});
