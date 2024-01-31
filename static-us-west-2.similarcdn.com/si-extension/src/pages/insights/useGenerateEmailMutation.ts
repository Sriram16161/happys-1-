import { useMutation } from 'react-query';
import { HttpClient } from '../../services/HttpClient';
import { GeneratedEmail } from '../../domain/generatedEmail';
import { useContactQuery } from '../../features/contacts/contactQuery/useContactQuery';
import { useAppState } from '../../AppStateProvider';
import { mergeContact } from '../../domain/contact';
import { useCompanyQuery } from '../../features/company/useCompanyQuery';
import { Insight } from '../../domain/insight';
import { InsightType } from '../../domain/insightType';
import { SignalType } from '../../domain/signal';
import { snakeToCamel } from '../../services/snakeToCamel';

const useMergedContact = () => {
  const contactQuery = useContactQuery();
  const { collectedContactInfo } = useAppState();
  return mergeContact(contactQuery?.data, collectedContactInfo);
};

type GenerateEmailProps = {
  valueProposition: string;
  painPoint: string;
  usecase: string;
  insights: Insight[];
};

export type GenerateEmailMutation = ReturnType<typeof useGenerateEmailMutation>;

type GenerateEmailPayload = {
  valueProposition: string;
  usecase: string;
  receiver: {
    companyName: string;
    contactName: string;
    contactRole: string;
    companyDescription?: string;
    companyWebsite: string;
    painPoint: string;
  };
  siteTrendsInsightModels: Insight[];
  opportunitiesInsightModels: Insight[];
  technologySignalInsightModels: Insight[];
  trafficSignalInsightModels: Insight[];
  newsSignalInsightModels: Insight[];
  adNetworkSignalInsightModels: Insight[];
  newMarketsSignalInsightModels: Insight[];
};

export type GeneratedEmailDto = {
  subject: string;
  intro: string;
  opportunity: string;
  value_proposition: string;
  call_to_action: string;
  signature: string;
};

const initialGenerateEmailPayload: GenerateEmailPayload = {
  valueProposition: '',
  usecase: '',
  receiver: { companyName: '', contactName: '', contactRole: '', companyWebsite: '', painPoint: '' },
  siteTrendsInsightModels: [],
  opportunitiesInsightModels: [],
  technologySignalInsightModels: [],
  trafficSignalInsightModels: [],
  newsSignalInsightModels: [],
  adNetworkSignalInsightModels: [],
  newMarketsSignalInsightModels: [],
};

export const useGenerateEmailMutation = () => {
  const contact = useMergedContact()!;
  const company = useCompanyQuery().data!;

  return useMutation<GeneratedEmail, Error, GenerateEmailProps>(
    'generateEmail',
    async ({ valueProposition, painPoint, usecase, insights }) => {
      const receiver = {
        companyName: contact.companyName,
        contactName: contact.name,
        contactRole: contact.title,
        companyDescription: company.description,
        companyWebsite: contact.site,
        painPoint,
      };
      const payload = insights.reduce<GenerateEmailPayload>(
        (acc, insight) => {
          const key = dtoKeyByInsight(insight);
          if (key) {
            acc[key] = acc[key].concat(insight);
          }

          return acc;
        },
        { ...initialGenerateEmailPayload, receiver, valueProposition, usecase }
      );

      const response = await HttpClient.post<GeneratedEmailDto>(
        '/sales-extension/api/email-generator/generate',
        payload
      );
      return snakeToCamel(response) as GeneratedEmail;
    }
  );
};

const dtoKeyByInsight = (insight: Insight) => {
  switch (insight.insightType) {
    case InsightType.Opportunity:
      return 'opportunitiesInsightModels';
    case InsightType.SiteTrends:
      return 'siteTrendsInsightModels';
    case InsightType.Signal:
      switch (insight.type) {
        case SignalType.Technology:
          return 'technologySignalInsightModels';
        case SignalType.Traffic:
          if ('trafficChanges' in insight.filter) return 'trafficSignalInsightModels';
          return 'newMarketsSignalInsightModels';
        case SignalType.News:
          return 'newsSignalInsightModels';
        case SignalType.AdNetwork:
          return 'adNetworkSignalInsightModels';
        default:
          return null;
      }
    default:
      return null;
  }
};
