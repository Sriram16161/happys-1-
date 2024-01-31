import React from 'react';
import { RevealContactUseCase } from './features/contacts/revealContact/useCase';
import { CreatePersonaUseCase } from './features/persona/createPersona/useCase';
import { UpdatePersonaUseCase } from './features/persona/updatePersona/useCase';
import { DeletePersonaUseCase } from './features/persona/deletePersona/useCase';
import { ExportContactsToCrmUseCase } from './features/crm/exportContactsToCrm/useCase';
import { exportAccountToCrmUseCase } from './features/crm/exportAccountToCrm/useCase';
import { SaveDomainToListUseCase } from './features/opportunityLists/saveDomainToList/useCase';

export type UseCaseContainer = {
  revealContact: RevealContactUseCase;
  createPersona: CreatePersonaUseCase;
  updatePersona: UpdatePersonaUseCase;
  deletePersona: DeletePersonaUseCase;
  exportContactsToCrm: ExportContactsToCrmUseCase;
  exportAccountToCrm: exportAccountToCrmUseCase;
  saveDomainToList: SaveDomainToListUseCase;
};

const UseCaseContext = React.createContext<UseCaseContainer>({} as UseCaseContainer);

export const UseCaseProvider = ({ children, useCases }: { children: React.ReactNode; useCases: UseCaseContainer }) => {
  return <UseCaseContext.Provider value={useCases}>{children}</UseCaseContext.Provider>;
};

export const useUseCases = () => React.useContext(UseCaseContext);
