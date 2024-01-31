import { useQuery } from 'react-query';
import { v4 as uuid } from 'uuid';
import { useAppState } from '../../AppStateProvider';
import { HttpClient } from '../../services/HttpClient';
import { Opportunity } from '../../domain/opportunity';
import { SiteTrend } from '../../domain/siteTrend';
import { InsightType } from '../../domain/insightType';
import { Signal } from '../../domain/signal';
import { snakeToCamel } from '../../services/snakeToCamel';

const fetchSiteTrendsInsights = async (companyDomain: string): Promise<SiteTrend[]> => {
  const searchParams = new URLSearchParams({ domain: companyDomain, country: `${999}` });
  const siteTrends = await HttpClient.get<Omit<SiteTrend, 'insightType' | 'id'>[]>(
    `/sales-extension/api/insights/site-trends?${searchParams.toString()}`
  );

  return siteTrends.map((t) => ({ ...t, insightType: InsightType.SiteTrends, id: uuid() }));
};

const fetchOpportunitiesInsights = async (companyDomain: string): Promise<Opportunity[]> => {
  const searchParams = new URLSearchParams({ domain: companyDomain });
  const response = await HttpClient.get<{ results: Omit<Opportunity, 'insightType' | 'id'>[] }>(
    `/sales-extension/api/insights/opportunities?${searchParams.toString()}`
  );

  return response.results.map((o) => ({ ...o, insightType: InsightType.Opportunity, id: uuid() }));
};

const fetchSignalsInsights = async (companyDomain: string): Promise<Signal[]> => {
  const searchParams = new URLSearchParams({ domain: companyDomain });
  const response = await HttpClient.get<Signal[]>(`/sales-extension/api/signals?${searchParams.toString()}`);
  const result = response
    .map((s) => ({ ...s, id: uuid(), insightType: InsightType.Signal }))
    .map(snakeToCamel) as Signal[];
  return result;
};

export const useInsightsQuery = () => {
  const { companyDomain, isOpen } = useAppState();

  return useQuery(
    ['insights', companyDomain],
    async () => {
      const insights = await Promise.all([
        fetchSiteTrendsInsights(companyDomain!),
        fetchOpportunitiesInsights(companyDomain!),
        fetchSignalsInsights(companyDomain!),
      ]);
      return insights.flat();
    },
    { enabled: isOpen && !!companyDomain }
  );
};

export type InsightsQuery = ReturnType<typeof useInsightsQuery>;
