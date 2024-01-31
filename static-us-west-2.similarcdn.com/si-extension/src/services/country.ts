import { QueryClient } from 'react-query';
import { Country } from '../domain/country';
import { HttpClient } from './HttpClient';
import { queryClient } from '../queryClient';

export const COUNTRIES_QUERY_KEY = 'countries';

const makeCountryService = (queryClient: QueryClient) => {
  const init = () => {
    const fetchCountries = async (): Promise<Country[]> => {
      try {
        const countries = await HttpClient.get<Country[]>('/sales-extension/api/countries');
        return countries;
      } catch (error) {
        console.error('Failed fetching countries', error);
        throw error;
      }
    };

    return queryClient.fetchQuery(COUNTRIES_QUERY_KEY, fetchCountries, { staleTime: Infinity, cacheTime: Infinity });
  };

  const getCountries = () => queryClient.getQueryData<Country[]>(COUNTRIES_QUERY_KEY) || [];

  const getCountryName = (countryId: number) => {
    return getCountries().find((c) => c.id === countryId)?.text ?? 'Unknown country';
  };

  const suggestCountry = (text: string) => {
    return getCountries()
      .filter((c) => text.toLowerCase().includes(c.text.toLowerCase()))
      .sort((a, b) => a.text.length - b.text.length)
      .at(0);
  };

  return { getCountryName, suggestCountry, init, getCountries };
};

export const CountryService = makeCountryService(queryClient);
