import { Contact, PrivateData, revealContact } from '../../../domain/contact';
import { decreaseContactsQuota, User } from '../../../domain/user';

export interface RevealContactRepository {
  getContactById(contactId: string): Contact | undefined;
  saveContact(contact: Contact): void;
  getUser(): User | undefined;
  saveUser(user: User): void;
  getPrivateData(contact: Contact): Promise<PrivateData | undefined>;
  addNotRevealedContactId(contactId: string): void;
}

const isRevealFailed = (data: PrivateData | undefined) => {
  if (!data) return true;
  const { revealErrors } = data;
  return (
    revealErrors?.hasDirectPhoneNumbersError ||
    revealErrors?.hasMobilePhoneNumbersError ||
    revealErrors?.hasValidEmailsError
  );
};

export const makeRevealContactUseCase =
  (repository: RevealContactRepository): RevealContactUseCase =>
  async (contactId: string) => {
    const contact = repository.getContactById(contactId);

    if (!contact) throw new Error('Contact not found');

    const privateData = await repository.getPrivateData(contact);
    if (!privateData) repository.addNotRevealedContactId(contactId);

    repository.saveContact(revealContact(contact, privateData));
    const user = repository.getUser();
    if (!user) throw new Error('User not found');

    const isSuccessful = !isRevealFailed(privateData);
    if (isSuccessful) repository.saveUser(decreaseContactsQuota(user));
    return { isSuccessful };
  };

export type RevealContactUseCase = (contactId: string) => Promise<{ isSuccessful: boolean }>;
