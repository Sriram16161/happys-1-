import React, { ReactNode } from 'react';
import { useQuery } from 'react-query';
import { COUNTRIES_QUERY_KEY } from '../services/country';

export const CountriesLoadingGuard = ({ children }: { children: ReactNode }) => {
  const countriesQuery = useQuery(COUNTRIES_QUERY_KEY);
  if (countriesQuery.isLoading || countriesQuery.isIdle) return <></>;
  return <>{children}</>;
};
