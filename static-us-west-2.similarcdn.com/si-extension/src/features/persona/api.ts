import { NewPersona, Persona, PersonaDictionary } from '../../domain/persona';
import { HttpClient } from '../../services/HttpClient';

export const personaApi = {
  createPersona: async (persona: NewPersona): Promise<Persona> => {
    return HttpClient.post<Persona>('/sales-extension/api/contacts/profile', persona);
  },
  updatePersona: async (persona: Persona): Promise<Persona> => {
    return HttpClient.put<Persona>(`/sales-extension/api/contacts/profile/${persona.id}`, persona);
  },
  deletePersona: async (persona: Persona): Promise<void> => {
    await HttpClient.delete(`/sales-extension/api/contacts/profile/${persona.id}`);
  },
  getPersonas: async (): Promise<Persona[]> => {
    const searchParams = new URLSearchParams({ includeSharedProfiles: 'false' }).toString();
    const response = await HttpClient.get<{ profiles: Persona[] }>(
      `/sales-extension/api/contacts/profile?${searchParams}`
    );
    return response.profiles;
  },
  getPersonaDictionary: async (): Promise<PersonaDictionary> => {
    return HttpClient.get<PersonaDictionary>('/sales-extension/api/contacts/description');
  },
};
