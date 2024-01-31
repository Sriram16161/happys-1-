export type Quota = {
  used: number;
  remaining: number;
  total: number;
};

export type ContactsQuota = Quota & { isFeatureLocked: boolean };

export type ExportQuota = Quota;

export type User = {
  userId: number;
  accountId: number;
  accountName: string;
  firstName: string;
  lastName: string;
  email: string;
  contactsQuota: ContactsQuota;
  isExtensionEnabled: boolean;
  isImpersonate: boolean;
  accountType: string;
  gdprRestricted: boolean;
  uiVersion: string;
  hasAccessToManageCrm: boolean;
  role: string;
  phone?: string;
};

export const decreaseContactsQuota = (user: User): User => ({
  ...user,
  contactsQuota: {
    ...user.contactsQuota,
    used: user.contactsQuota.used + 1,
    remaining: user.contactsQuota.remaining - 1,
  },
});

export const isOutOfQuota = (user: User): boolean => user.contactsQuota.remaining === 0;
