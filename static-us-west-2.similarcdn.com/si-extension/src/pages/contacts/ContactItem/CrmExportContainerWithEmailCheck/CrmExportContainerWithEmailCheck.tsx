import React from 'react';
import { SWReactIcons } from '@similarweb/icons';
import { colorsPalettes } from '@similarweb/styles';
import { Tooltip } from '../../../../components/Tooltip';
import { translate } from '../../../../services/i18n';
import { capitalize } from '../../../../services/string';
import { CrmExportContainer, CrmExportContainerProps } from '../CrmExportContainer/CrmExportContainer';
import { StyledCrmExportButton } from '../CrmExportContainer/styles';

export const CrmExportContainerWithEmailCheck = (props: CrmExportContainerProps & { isFirstInList: boolean }) => {
  const { contact, isFirstInList, crm } = props;

  if (!contact.hasValidEmails)
    return (
      <Tooltip
        content={translate('contact_card.export_crm.without_email.tooltip', { crm: capitalize(crm) })}
        placement={isFirstInList ? 'left' : 'top-left'}
        minWidth={200}
      >
        <StyledCrmExportButton disabled>
          {!!crm && <SWReactIcons iconName={crm} size="xs" iconColor={colorsPalettes.carbon[200]} />}
          {translate('contact_card.export_crm')}
        </StyledCrmExportButton>
      </Tooltip>
    );

  return <CrmExportContainer contact={contact} crm={crm} />;
};
