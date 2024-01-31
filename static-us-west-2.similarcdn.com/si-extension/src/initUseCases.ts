import { appStore } from './services/appStore';
import { makeRevealContactRepository } from './features/contacts/revealContact/repository';
import { makeRevealContactUseCase } from './features/contacts/revealContact/useCase';
import { UseCaseContainer } from './UseCaseProvider';
import { queryClient } from './queryClient';
import { makeCreatePersonaRepository } from './features/persona/createPersona/repository';
import { makeCreatePersonaUseCase } from './features/persona/createPersona/useCase';
import { makeUpdatePersonaRepository } from './features/persona/updatePersona/repository';
import { makeUpdatePersonaUseCase } from './features/persona/updatePersona/useCase';
import { makeDeletePersonaRepository } from './features/persona/deletePersona/repository';
import { makeDeletePersonaUseCase } from './features/persona/deletePersona/useCase';
import { makeExportContactsToCrmRepository } from './features/crm/exportContactsToCrm/repository';
import { makeExportContactsToCrmUseCase } from './features/crm/exportContactsToCrm/useCase';
import { makeExportAccountToCrmRepository } from './features/crm/exportAccountToCrm/repository';
import { makeExportAccountToCrmUseCase } from './features/crm/exportAccountToCrm/useCase';
import { makeSaveDomainToListRepository } from './features/opportunityLists/saveDomainToList/repository';
import { makeSaveDomainToListUseCase } from './features/opportunityLists/saveDomainToList/useCase';
import { makeContactRepository } from './features/contacts/repository';

export function initUseCases(): UseCaseContainer {
  const contactRepository = makeContactRepository(queryClient);
  const revealContactRepository = makeRevealContactRepository(queryClient, contactRepository);

  const createPersonaRepository = makeCreatePersonaRepository(appStore, queryClient);
  const updatePersonaRepository = makeUpdatePersonaRepository(appStore, queryClient);
  const deletePersonaRepository = makeDeletePersonaRepository(appStore, queryClient);

  const exportContactsToCrmRepository = makeExportContactsToCrmRepository(appStore, contactRepository);
  const exportAccountToCrmRepository = makeExportAccountToCrmRepository(appStore);

  const saveDomainToListRepository = makeSaveDomainToListRepository(appStore);

  return {
    revealContact: makeRevealContactUseCase(revealContactRepository),
    createPersona: makeCreatePersonaUseCase(createPersonaRepository),
    updatePersona: makeUpdatePersonaUseCase(updatePersonaRepository),
    deletePersona: makeDeletePersonaUseCase(deletePersonaRepository),
    exportContactsToCrm: makeExportContactsToCrmUseCase(exportContactsToCrmRepository),
    exportAccountToCrm: makeExportAccountToCrmUseCase(exportAccountToCrmRepository),
    saveDomainToList: makeSaveDomainToListUseCase(saveDomainToListRepository),
  };
}
