import { Persona } from '../../../domain/persona';

export type DeletePersonaUseCase = (persona: Persona) => Promise<void>;

export interface DeletePersonaRepository {
  deletePersona(persona: Persona): Promise<void>;
  removePersona(persona: Persona): void;
  notifyPersonaDeleted(persona: Persona): void;
}

export const makeDeletePersonaUseCase = (repository: DeletePersonaRepository): DeletePersonaUseCase => {
  return async (persona: Persona) => {
    await repository.deletePersona(persona);
    repository.removePersona(persona);
    repository.notifyPersonaDeleted(persona);
  };
};
