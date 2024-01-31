import { Persona } from '../../../domain/persona';

export interface UpdatePersonaRepository {
  updatePersona(persona: Persona): Promise<Persona>;
  savePersona(persona: Persona): void;
  notifyPersonaUpdated(persona: Persona): void;
}

export type UpdatePersonaUseCase = (persona: Persona) => Promise<void>;

export const makeUpdatePersonaUseCase =
  (repository: UpdatePersonaRepository): UpdatePersonaUseCase =>
  async (persona: Persona) => {
    const updatedPersona = await repository.updatePersona(persona);
    repository.savePersona(updatedPersona);
    repository.notifyPersonaUpdated(updatedPersona);
  };
