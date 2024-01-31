import { QueryClient } from 'react-query';
import { Persona } from '../../../domain/persona';
import { AppStore } from '../../../services/appStore';
import { personaApi } from '../api';
import { DeletePersonaRepository } from './useCase';
import { translate } from '../../../services/i18n';

export const makeDeletePersonaRepository = (appStore: AppStore, queryClient: QueryClient): DeletePersonaRepository => ({
  deletePersona: (persona: Persona) => personaApi.deletePersona(persona),
  removePersona: (persona: Persona) => {
    queryClient.setQueryData<Persona[]>('personas', (personas) => personas?.filter((p) => p.id !== persona.id) ?? []);

    if (appStore.getState().contactFilters.persona?.id === persona.id) {
      appStore.setContactsPersona(undefined);
    }
  },
  notifyPersonaDeleted: (persona: Persona) => {
    appStore.setToast({
      content: translate('contacts.persona.deleted', { personaName: persona.name }),
      icon: 'checked',
    });
  },
});
