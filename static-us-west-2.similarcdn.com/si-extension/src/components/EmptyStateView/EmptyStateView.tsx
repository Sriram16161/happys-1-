import React from 'react';
import { useTranslation } from 'react-i18next';
import { AssetsService } from '../../services/AssetsService';
import {
  StyledEmptyStateContainer,
  StyledEmptyStateImage,
  StyledEmptyStateTitle,
  StyledEmptyStateDescription,
} from './styles';

export type EmptyStateVariant = 'girl' | 'girl-in' | 'lens' | 'lens-small' | 'lens-rised';

type EmptyStateViewProps = {
  textKey?: string;
  messageKey?: string;
  img?: string;
  variant?: EmptyStateVariant;
};

export const EmptyStateView = ({
  textKey = 'company.empty_state.text',
  messageKey = 'company.empty_state.message',
  img = '/images/empty-state-girl.svg',
  variant = 'girl',
}: EmptyStateViewProps) => {
  const { t } = useTranslation();

  return (
    <StyledEmptyStateContainer>
      <StyledEmptyStateImage src={AssetsService.assetUrl(img)} variant={variant} />
      <StyledEmptyStateTitle data-automation="EmptyStateTitle">{t(textKey)}</StyledEmptyStateTitle>
      <StyledEmptyStateDescription data-automation="EmptyStateMessage">{t(messageKey)}</StyledEmptyStateDescription>
    </StyledEmptyStateContainer>
  );
};
