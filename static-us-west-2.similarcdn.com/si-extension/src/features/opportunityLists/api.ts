import { OpportunityList } from '../../domain/list';
import { BASE_API_URL, HttpClient } from '../../services/HttpClient';

const BASE_URL = `${BASE_API_URL}/opportunity-list`;

export const opportunityListsApi = {
  getOpportunityList: async (signal?: AbortSignal) => HttpClient.get<OpportunityList[]>(`${BASE_URL}`, { signal }),
  getOpportunityListCount: async (signal?: AbortSignal) =>
    HttpClient.get<number>(`${BASE_URL}/domains-count`, { signal }),
  createOpportunityList: async (name: string, signal?: AbortSignal) =>
    HttpClient.post<string>(`${BASE_URL}`, { name, country: 0 }, { signal }),
  saveToList: async ({ id, domain }: { id: string; domain: string }, signal?: AbortSignal): Promise<void> => {
    return HttpClient.put<void>(`${BASE_URL}/${id}`, { domain }, { signal });
  },
};
