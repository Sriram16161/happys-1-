import { Contact } from '../../../domain/contact';
import { ContactsToExportPayload, ExportToCrmReturn, Crm, LeadsToExportPayload } from '../../../domain/crm';

export interface ExportContactsToCrmRepository {
  exportAsContacts(payload: ContactsToExportPayload, crm: Crm): Promise<ExportToCrmReturn>;
  exportAsLeads(payload: LeadsToExportPayload): Promise<ExportToCrmReturn>;
  notifyContactsExportSucceed(): void;
  notifyContactsExportFailed(): void;
  updateContact: (
    contactId: string,
    linkObject: Pick<Contact, 'hubspotContactUrl' | 'salesforceLeadUrl' | 'salesforceContactUrl'>
  ) => void;
}

export type ExportContactsToCrmUseCase = ({
  payload,
  crm,
  onSuccess,
  onError,
}: {
  payload: LeadsToExportPayload | ContactsToExportPayload;
  crm: Crm;
  onSuccess: () => void;
  onError: () => void;
}) => Promise<void>;

export const makeExportContactsToCrmUseCase =
  (repository: ExportContactsToCrmRepository): ExportContactsToCrmUseCase =>
  async ({ payload, crm, onSuccess, onError }) => {
    const isExportedAsLead = 'leads' in payload;

    const createLinkObject = (crmLink: string) => {
      let linkObject;
      if (crm === Crm.hubspot) {
        linkObject = { hubspotContactUrl: crmLink };
      } else if (isExportedAsLead) {
        linkObject = { salesforceLeadUrl: crmLink };
      } else {
        linkObject = { salesforceContactUrl: crmLink };
      }
      return linkObject;
    };

    try {
      let result;
      if (isExportedAsLead) {
        result = await repository.exportAsLeads(payload);
      } else {
        result = await repository.exportAsContacts(payload, crm);
      }

      if (result?.inProgressRecords > 0) return;

      if (result?.processedRecords === 1) {
        repository.notifyContactsExportSucceed();
        onSuccess();

        if (result.succeededLinks[0]?.externalLink) {
          repository.updateContact(
            isExportedAsLead ? payload.leads[0].contactId : payload.contacts[0].contactId,
            createLinkObject(result.succeededLinks[0].externalLink)
          );
        }
      } else {
        onError();
        repository.notifyContactsExportFailed();
      }
    } catch (error) {
      onError();
      repository.notifyContactsExportFailed();
    }
  };
