import React, { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { StyledPersonaFieldName, StyledPersonaFieldValue, StyledTooltip, StylePersonaField } from './styles';
import { Persona } from '../../../../domain/persona';

export const PersonaTooltipContent = ({ persona }: { persona: Persona }) => {
  const { t } = useTranslation();
  const fields = [
    { labelKey: 'department', value: persona.departments },
    { labelKey: 'seniority', value: persona.seniority },
    { labelKey: 'include_titles', value: persona.includeTitles },
    { labelKey: 'exclude_titles', value: persona.excludeTitles },
  ].filter(({ value }) => value.length > 0);

  return (
    <>
      {fields.map(({ labelKey, value }) => (
        <StylePersonaField data-automation="PersonaTooltipField" key={labelKey}>
          <StyledPersonaFieldName data-automation="PersonaTooltipFieldName">
            {t(`contacts.persona.${labelKey}`)}:
          </StyledPersonaFieldName>
          <StyledPersonaFieldValue data-automation="PersonaTooltipFieldValue">
            {value.join(', ')}
          </StyledPersonaFieldValue>
        </StylePersonaField>
      ))}
    </>
  );
};

export type PersonaTooltipProps = {
  persona: Persona;
  children: ReactNode;
};

export const PersonaTooltip = ({ persona, children }: PersonaTooltipProps) => {
  return <StyledTooltip content={<PersonaTooltipContent persona={persona} />}>{children}</StyledTooltip>;
};
