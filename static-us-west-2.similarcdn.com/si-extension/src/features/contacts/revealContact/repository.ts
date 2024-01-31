import { QueryClient } from 'react-query';
import { Contact } from '../../../domain/contact';
import { contactsApi } from '../api';
import { User } from '../../../domain/user';
import { appStore } from '../../../services/appStore';
import { ContactRepository } from '../repository';
import { RevealContactRepository } from './useCase';

export const makeRevealContactRepository = (
  queryClient: QueryClient,
  contactRepository: ContactRepository
): RevealContactRepository => ({
  getUser: () => queryClient.getQueryData<User>('user'),
  saveUser: (user: User) => queryClient.setQueryData('user', user),
  getPrivateData: (contact: Contact) => contactsApi.getPrivateData(contact),
  addNotRevealedContactId: (contactId: string) => appStore.addNotRevealedContactId(contactId),
  ...contactRepository,
});
