import { Contact } from '../../domain/contact';
import {
  ContactsToExportPayload,
  ContactsToExportPreviewReturn,
  ExportToCrmReturn,
  CrmSearchAccountsReturn,
  Crm,
  LeadsToExportPayload,
  CrmStatus,
  DomainToExportPayload,
} from '../../domain/crm';
import { BASE_API_URL, HttpClient } from '../../services/HttpClient';

export const crmApi = {
  fetchCrmStatus: async (crm: Crm) => HttpClient.get<CrmStatus>(`${BASE_API_URL}/${crm}/status`),
  exportAsContacts: async (payload: ContactsToExportPayload, crm: Crm): Promise<ExportToCrmReturn> => {
    return HttpClient.post<ExportToCrmReturn>(`${BASE_API_URL}/${crm}/export/contact`, payload);
  },
  exportAsLeads: async (payload: LeadsToExportPayload): Promise<ExportToCrmReturn> => {
    return HttpClient.post<ExportToCrmReturn>(`${BASE_API_URL}/salesforce/export/lead`, payload);
  },
  exportAccount: async (payload: DomainToExportPayload, crm: Crm): Promise<ExportToCrmReturn> => {
    return HttpClient.post<ExportToCrmReturn>(`${BASE_API_URL}/${crm}/export/accounts`, payload);
  },
  exportContactsPreview: async (
    { contacts, crm }: { contacts: Contact[]; crm: Crm },
    signal?: AbortSignal
  ): Promise<ContactsToExportPreviewReturn> => {
    return HttpClient.post<ContactsToExportPreviewReturn>(
      `${BASE_API_URL}/${crm}/export/contacts/preview`,
      { contacts },
      { signal }
    );
  },
  searchAccounts: async (
    { searchText, after = '0', limit, crm }: { searchText: string; after: string; limit: string; crm: Crm },
    signal?: AbortSignal
  ): Promise<CrmSearchAccountsReturn> => {
    const searchParams = new URLSearchParams({ searchText, after, limit });

    const accountsDTO = await HttpClient.get<CrmSearchAccountsReturn>(
      `${BASE_API_URL}/${crm}/search-accounts?${searchParams.toString()}`,
      { signal }
    );

    return accountsDTO;
  },
};
