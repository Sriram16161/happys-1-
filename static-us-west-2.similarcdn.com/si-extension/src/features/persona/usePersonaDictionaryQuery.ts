import { useQuery } from 'react-query';
import { useAppState } from '../../AppStateProvider';
import { personaApi } from './api';

export const usePersonaDictionaryQuery = () => {
  const { isOpen } = useAppState();
  return useQuery('persona-dictionary', personaApi.getPersonaDictionary, { enabled: isOpen });
};
