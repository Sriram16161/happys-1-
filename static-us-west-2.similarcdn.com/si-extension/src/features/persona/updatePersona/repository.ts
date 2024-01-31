import { QueryClient } from 'react-query';
import { AppStore } from '../../../services/appStore';
import { UpdatePersonaRepository } from './useCase';
import { personaApi } from '../api';
import { Persona } from '../../../domain/persona';
import { PERSONAS_QUERY_KEY } from '../personasQuery/personasQueryKey';
import { translate } from '../../../services/i18n';

export const makeUpdatePersonaRepository = (appStore: AppStore, queryClient: QueryClient): UpdatePersonaRepository => ({
  updatePersona: (persona) => personaApi.updatePersona(persona),
  savePersona: (persona) => {
    queryClient.setQueryData(PERSONAS_QUERY_KEY, (oldData: Persona[] | undefined) => {
      if (!oldData) return [persona];

      return oldData.map((p) => (p.id === persona.id ? persona : p));
    });

    appStore.setContactsPersona(persona);
  },
  notifyPersonaUpdated: (persona) => {
    appStore.setToast({
      icon: 'checked',
      content: translate('contacts.persona.updated', { personaName: persona.name }),
    });
  },
});
