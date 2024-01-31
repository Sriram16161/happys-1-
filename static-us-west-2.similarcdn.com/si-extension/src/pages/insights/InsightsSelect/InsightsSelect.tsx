import React, { FC, useMemo, useState } from 'react';
import { StyledInsightsDropdownButton, StyledInsightsSelect } from './styles';
import { SWReactIcons } from '@similarweb/icons';
import { CheckboxDropdownOption, Dropdown } from '../../../components/Dropdown';
import { Insight } from '../../../domain/insight';
import { InsightsQuery } from '../useInsightsQuery';
import { getInsightLabel } from './getInsightLabel';

export type InsightsSelectProps = {
  insightsQuery: InsightsQuery;
  selectedInsightIds: string[];
  onChange(selectedInsightIds: string[]): void;
};

export const InsightsSelect: FC<InsightsSelectProps> = ({ insightsQuery, onChange, selectedInsightIds }) => {
  const [isOpened, setIsOpened] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const insightById = useMemo(() => {
    const result: Record<string, Insight> = {};
    insightsQuery.data?.forEach((insight) => (result[insight.id] = insight));

    return result;
  }, [insightsQuery.data]);

  const insights = insightsQuery.data ?? [];

  const filteredInsights = useMemo(() => {
    return insights.filter((insight) => getInsightLabel(insight).toLowerCase().includes(searchTerm.toLowerCase()));
  }, [insights, searchTerm]);

  const getDropdownButtonLabel = () => {
    if (insightsQuery.isLoading) return 'Loading...';
    if (!selectedInsightIds.length) return 'Select insights';

    const firstInsight = insightById[selectedInsightIds[0]];
    let label = getInsightLabel(firstInsight);
    if (selectedInsightIds.length > 1) {
      label += ` +${selectedInsightIds.length - 1}`;
    }
    return label;
  };

  const handleInsightSelect = (insightId: string) => {
    if (selectedInsightIds.includes(insightId)) {
      onChange(selectedInsightIds.filter((id) => id !== insightId));
    } else {
      onChange([...selectedInsightIds, insightId]);
    }
  };

  const searchProps = {
    value: searchTerm,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value),
    placeholder: 'Search insights',
  };

  return (
    <StyledInsightsSelect>
      <StyledInsightsDropdownButton onClick={() => setIsOpened(true)} disabled={!insights.length}>
        {getDropdownButtonLabel()}
        <SWReactIcons iconName="chev-down" size="xs" />
      </StyledInsightsDropdownButton>
      <Dropdown isOpened={isOpened} onClose={() => setIsOpened(false)} maxHeight={264} searchProps={searchProps}>
        {filteredInsights.map((insight) => (
          <CheckboxDropdownOption
            key={insight.id}
            isSelected={selectedInsightIds.includes(insight.id)}
            onClick={() => handleInsightSelect(insight.id)}
          >
            {getInsightLabel(insight)}
          </CheckboxDropdownOption>
        ))}
      </Dropdown>
    </StyledInsightsSelect>
  );
};
