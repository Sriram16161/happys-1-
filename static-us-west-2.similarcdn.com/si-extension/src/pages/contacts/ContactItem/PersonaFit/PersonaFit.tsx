import React from 'react';
import { SWReactIcons } from '@similarweb/icons';
import { StyledPersonaFit, StyledPersonaFitLabel } from './styles';
import { translate } from '../../../../services/i18n';

export const PersonaFit = () => (
  <StyledPersonaFit>
    <SWReactIcons iconName="lightning" />
    <StyledPersonaFitLabel data-automation="ContactPersonaFit">
      {translate('contact_card.persona_fit')}
    </StyledPersonaFitLabel>
  </StyledPersonaFit>
);
