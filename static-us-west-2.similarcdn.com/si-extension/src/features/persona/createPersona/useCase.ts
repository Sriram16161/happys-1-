import { NewPersona, Persona } from '../../../domain/persona';

export interface CreatePersonaRepository {
  createPersona(persona: NewPersona): Promise<Persona>;
  addPersona(persona: Persona): void;
  notifyPersonaCreated(persona: Persona): void;
}

export type CreatePersonaUseCase = (persona: NewPersona) => Promise<void>;

export const makeCreatePersonaUseCase =
  (repository: CreatePersonaRepository): CreatePersonaUseCase =>
  async (persona: NewPersona) => {
    const createdPersona = await repository.createPersona(persona);
    repository.addPersona(createdPersona);
    repository.notifyPersonaCreated(createdPersona);
  };
