import React from 'react';
import { useAppState } from '../../AppStateProvider';
import { Page } from '../../domain/page';
import { ComingSoon } from '../../components/ComingSoon';
import { InsightsView } from './InsightsView';

export const InsightsContainer = () => {
  const { page, settingsStorage } = useAppState();
  if (page !== Page.Contact || !settingsStorage?.isEmailGenerationEnabled) {
    return <ComingSoon />;
  }

  return <InsightsView />;
};
