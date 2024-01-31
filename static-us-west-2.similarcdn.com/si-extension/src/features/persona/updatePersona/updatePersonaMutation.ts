import { useMutation } from 'react-query';
import { Persona } from '../../../domain/persona';
import { useUseCases } from '../../../UseCaseProvider';

export const useUpdatePersonaMutation = (onSuccess: () => void) => {
  const { updatePersona } = useUseCases();
  return useMutation('update-persona', (persona: Persona) => updatePersona(persona), { onSuccess });
};
