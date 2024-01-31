import { QueryClient } from 'react-query';
import { NewPersona, Persona } from '../../../domain/persona';
import { AppStore } from '../../../services/appStore';
import { personaApi } from '../api';
import { CreatePersonaRepository } from './useCase';
import { PERSONAS_QUERY_KEY } from '../personasQuery/personasQueryKey';
import { translate } from '../../../services/i18n';

export const makeCreatePersonaRepository = (appStore: AppStore, queryClient: QueryClient): CreatePersonaRepository => ({
  createPersona: (persona: NewPersona) => personaApi.createPersona(persona),
  addPersona: (persona: Persona) => {
    queryClient.setQueryData(PERSONAS_QUERY_KEY, (oldData: Persona[] | undefined) => {
      if (!oldData) return [persona];

      return [...oldData, persona];
    });
    appStore.setContactsPersona(persona);
  },
  notifyPersonaCreated: (persona: Persona) => {
    appStore.setToast({
      icon: 'checked',
      content: translate('contacts.persona.created', { personaName: persona.name }),
    });
  },
});
