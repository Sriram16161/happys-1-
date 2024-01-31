import { useMutation } from 'react-query';
import { Persona } from '../../../domain/persona';
import { useUseCases } from '../../../UseCaseProvider';

export const useDeletePersonaMutation = (onSuccess: () => void) => {
  const { deletePersona } = useUseCases();
  return useMutation('delete-persona', (persona: Persona) => deletePersona(persona), { onSuccess });
};
