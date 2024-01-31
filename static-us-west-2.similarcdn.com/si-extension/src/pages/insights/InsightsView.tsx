import React, { useState } from 'react';
import { useContactQuery } from '../../features/contacts/contactQuery/useContactQuery';
import { useCompanyQuery } from '../../features/company/useCompanyQuery';
import { useGenerateEmailMutation } from './useGenerateEmailMutation';
import { UseCaseSelect } from './UseCaseSelect';
import { EmailPreview } from './EmailPreview';
import { InsightsSelect } from './InsightsSelect';
import { useInsightsQuery } from './useInsightsQuery';
import {
  StyledButton,
  StyledInsightsPage,
  StyledInsightsPageHeading,
  StyledTextArea,
  StyledTextAreaLabel,
  StyledUseCaseField,
  StyledUseCaseLabel,
} from './styles';

export const InsightsView = () => {
  const [valueProposition, setValueProposition] = useState('');
  const [painPoint, setPainPoint] = useState('');
  const [usecase, setUsecase] = useState('general');
  const [selectedInsightIds, setSelectedInsightIds] = useState<string[]>([]);
  const generateEmailMutation = useGenerateEmailMutation();
  const insightsQuery = useInsightsQuery();
  const contact = useContactQuery().data;
  const company = useCompanyQuery().data;

  const onGenerateClick = () => {
    const selectedInsights = insightsQuery.data?.filter((insight) => selectedInsightIds.includes(insight.id)) ?? [];
    generateEmailMutation.mutate({ valueProposition, painPoint, usecase, insights: selectedInsights });
  };

  const isGenerationDisabled = generateEmailMutation.isLoading || !contact || !company || !selectedInsightIds.length;

  return (
    <StyledInsightsPage>
      <StyledInsightsPageHeading>Email Generator</StyledInsightsPageHeading>
      <StyledTextAreaLabel>Value Proposition</StyledTextAreaLabel>
      <StyledTextArea value={valueProposition} onChange={(e) => setValueProposition(e.target.value)} />
      <StyledTextAreaLabel>Pain Point</StyledTextAreaLabel>
      <StyledTextArea value={painPoint} onChange={(e) => setPainPoint(e.target.value)} />
      <StyledUseCaseField>
        <StyledUseCaseLabel>Usecase:</StyledUseCaseLabel>
        <UseCaseSelect value={usecase} onChange={setUsecase} />
      </StyledUseCaseField>
      <InsightsSelect
        insightsQuery={insightsQuery}
        selectedInsightIds={selectedInsightIds}
        onChange={setSelectedInsightIds}
      />
      <StyledButton onClick={onGenerateClick} disabled={isGenerationDisabled}>
        Generate
      </StyledButton>
      <EmailPreview emailMutation={generateEmailMutation} />
    </StyledInsightsPage>
  );
};
