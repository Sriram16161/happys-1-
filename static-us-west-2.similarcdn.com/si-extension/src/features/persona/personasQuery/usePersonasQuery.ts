import { useQuery } from 'react-query';
import { personaApi } from '../api';
import { PERSONAS_QUERY_KEY } from './personasQueryKey';

export const usePersonasQuery = () => {
  return useQuery(PERSONAS_QUERY_KEY, () => personaApi.getPersonas());
};
