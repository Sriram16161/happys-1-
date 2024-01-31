import {
  Contact,
  ContactDetail,
  ContactStatusFilterValue,
  ContactsCountByCountry,
  PrivateData,
} from '../../domain/contact';
import { Country } from '../../domain/country';
import { Persona } from '../../domain/persona';
import { HttpClient } from '../../services/HttpClient';

type ContactDTO = Omit<Contact, 'matchedProfiles'> & { matchedProfiles?: string[] };

export type GetContactsParams = {
  linkedinId?: string;
  page?: number;
  perPage?: number;
  domain?: string;
  searchText?: string;
  persona?: Persona;
  includeCountries?: Country[];
  contactDetails: ContactDetail | null;
  status: ContactStatusFilterValue;
};

type GetContactsPayload = {
  searchText?: string;
  profiles: Persona[];
  employeeLocation?: { includeCountryCodes: number[] };
  contactDetails?: {
    hasEmail: boolean;
    hasPhone: boolean;
  };
  includeOnlyNotRevealed?: boolean;
  includeOnlyRevealed?: boolean;
  isExportedToSalesforce?: boolean;
  isExportedToHubspot?: boolean;
};

export type GetContactParams = {
  linkedinId?: string;
  companyLinkedinIds: number[];
  fullName?: string;
  companyName?: string | string[];
};

const createContactDetailsPayload = (contactDetails: ContactDetail | null) => ({
  hasEmail: contactDetails === ContactDetail.email || contactDetails === ContactDetail.both,
  hasPhone: contactDetails === ContactDetail.phone || contactDetails === ContactDetail.both,
});

const applyContactStatusToPayload = (status: ContactStatusFilterValue, payload: GetContactsPayload) => {
  const updatedPayload = { ...payload };

  if (status.notRevealed && status.notExported && status.exported) {
    return updatedPayload;
  }

  if (status.notRevealed && status.exported && !status.notExported) {
    updatedPayload.includeOnlyNotRevealed = true;
    updatedPayload.isExportedToSalesforce = true;
    updatedPayload.isExportedToHubspot = true;
    return updatedPayload;
  }

  if (status.notRevealed) {
    updatedPayload.includeOnlyNotRevealed = true;
  }

  if (status.exported && status.notExported) {
    updatedPayload.includeOnlyRevealed = true;
  }

  if (status.exported && !status.notExported) {
    updatedPayload.isExportedToSalesforce = true;
    updatedPayload.isExportedToHubspot = true;
  } else if (status.notExported && !status.exported) {
    updatedPayload.includeOnlyRevealed = true;
    updatedPayload.isExportedToSalesforce = false;
    updatedPayload.isExportedToHubspot = false;
  }

  return updatedPayload;
};

export const contactsApi = {
  getContacts: async ({
    linkedinId,
    domain,
    page = 0,
    perPage = 20,
    searchText = '',
    persona,
    includeCountries = [],
    contactDetails,
    status,
  }: GetContactsParams): Promise<Contact[]> => {
    const searchParams = new URLSearchParams();

    if (linkedinId) searchParams.append('linkedinId', linkedinId);
    if (domain) searchParams.append('domain', domain);
    searchParams.append('page', `${page}`);
    searchParams.append('pageSize', `${perPage}`);

    const url = `/sales-extension/api/contacts?${searchParams.toString()}`;
    let payload: GetContactsPayload = { searchText, profiles: [] };
    payload = applyContactStatusToPayload(status, payload);

    if (contactDetails) payload.contactDetails = createContactDetailsPayload(contactDetails);

    if (includeCountries.length > 0) {
      payload.employeeLocation = { includeCountryCodes: includeCountries.map((c) => c.id) };
    }

    if (persona) payload.profiles.push(persona);

    const contactsDTO = await HttpClient.post<{ rows: ContactDTO[] } | undefined>(url, payload);

    const contacts = (contactsDTO?.rows || []).map((contact) => ({
      ...contact,
      matchedProfiles: contact.matchedProfiles || [],
    }));

    return contacts;
  },

  getContactsCountByCountries: async ({
    linkedinId,
    domain,
    searchText,
    persona,
    contactDetails,
    status,
  }: GetContactsParams): Promise<ContactsCountByCountry[]> => {
    const searchParams = new URLSearchParams();

    if (linkedinId) searchParams.append('linkedinId', linkedinId);
    if (domain) searchParams.append('domain', domain);

    let payload: GetContactsPayload = { searchText, profiles: [] };
    payload = applyContactStatusToPayload(status, payload);

    if (persona) payload.profiles.push(persona);

    if (contactDetails) payload.contactDetails = createContactDetailsPayload(contactDetails);

    const url = `/sales-extension/api/contacts/count-by-countries?${searchParams.toString()}`;

    type ContactsCountByCountryDTO = { country: { id: number; name: string }; contactsCount: number };
    const response = await HttpClient.post<ContactsCountByCountryDTO[]>(url, payload);

    return response.map(({ country, contactsCount }) => ({
      country: { id: country.id, text: country.name },
      contactsCount,
    }));
  },

  getPrivateData: async (contact: Contact) => {
    const revealContactQuery = {
      contactId: contact.id,
      companyId: contact.companyId,
      prospect: contact.originalSite,
      hasValidEmails: contact.hasValidEmails,
      hasMobilePhoneNumbers: contact.hasMobilePhoneNumbers,
      hasDirectPhoneNumbers: contact.hasDirectPhoneNumbers,
    };
    const url = '/sales-extension/api/contacts/reveal';
    const response = await HttpClient.post<PrivateData>(url, revealContactQuery);
    return response;
  },

  getContact: async (
    { linkedinId, companyLinkedinIds, fullName, companyName }: GetContactParams,
    signal?: AbortSignal
  ): Promise<Contact> => {
    const companyNames = Array.isArray(companyName) ? companyName : [companyName];
    const contactDTO = await HttpClient.post<Contact[]>(
      '/sales-extension/api/linkedin/contacts',
      { searchContacts: [{ linkedinId, companyLinkedinIds, fullName, companyNames: companyNames.filter(Boolean) }] },
      { signal }
    );

    return contactDTO && contactDTO[0];
  },

  getContactsForSearchPage: async (
    searchContacts: {
      linkedinId?: string;
      companyName?: string;
      companyLinkedinId?: string;
    }[],
    signal?: AbortSignal
  ): Promise<Contact[]> => {
    const contactDTO = await HttpClient.post<Contact[]>(
      '/sales-extension/api/linkedin/contacts',
      { searchContacts },
      { signal }
    );
    return contactDTO;
  },
};
