import { useMutation } from 'react-query';
import { NewPersona } from '../../../domain/persona';
import { useUseCases } from '../../../UseCaseProvider';

export const useCreatePersonaMutation = (onSuccess: () => void) => {
  const { createPersona } = useUseCases();
  return useMutation('create-persona', (persona: NewPersona) => createPersona(persona), { onSuccess });
};
