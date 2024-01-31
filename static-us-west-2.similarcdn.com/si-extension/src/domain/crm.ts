export enum Crm {
  salesforce = 'salesforce',
  hubspot = 'hubspot',
}

export type CrmExportLimit = {
  contactsLimit: number;
  leadsLimit: number;
};

export type CrmStatus = {
  isAccountExportEnabled: boolean;
  isContactExportEnabled: boolean;
  isCurrentUserVerifiedByCrm: boolean;
  isLeadExportEnabled?: boolean;
  crmExportLimit: CrmExportLimit;
  isCrmLabelsEnabled: boolean;
};

export type ContactToExport = {
  contactId: string;
  domain: string;
  accountId?: string;
};

export type ContactsToExportPayload = {
  countries: number[];
  contacts: ContactToExport[];
};

export type LeadToExport = {
  contactId: string;
  domain: string;
};

export type LeadsToExportPayload = {
  countries: number[];
  leads: LeadToExport[];
};

export type ExportToCrmReturn = {
  totalRecords: number;
  cleanedRecords: number;
  inProgressRecords: number;
  processedRecords: number;
  failedRecords: number;
  failedRecordsByType: Record<string, number>;
  succeededLinks: {
    externalLink: string;
    similarwebId: string;
  }[];
};

export type CrmAccount = {
  id: string;
  domain?: string;
  name?: string;
  favicon?: string;
  isCurrentAccount?: boolean;
  crmAccountUrl?: string;
};

export type ContactToExportPreviewReturn = {
  isExistAsLead?: true;
  contactId: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  accountName: string;
  accountDomain: string;
  matchedCompanies: CrmAccount[];
};

export type ContactsToExportPreviewReturn = ContactToExportPreviewReturn[];

export type NextPage = {
  after: number;
};

export type CrmSearchAccountsReturn = {
  data: CrmAccount[];
  next: NextPage;
};

export type DomainToExportPayload = {
  countries: number[];
  domains: string[];
};
