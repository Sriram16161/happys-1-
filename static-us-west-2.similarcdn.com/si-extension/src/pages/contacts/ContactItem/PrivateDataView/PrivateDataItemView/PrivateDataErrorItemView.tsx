import React, { FC } from 'react';
import { SWReactIcons } from '@similarweb/icons';
import { PrivateDataType } from '../../../../../domain/contact';
import { Tooltip } from '../../../../../components/Tooltip';
import { translate } from '../../../../../services/i18n';
import { getIconName } from './PrivateDataItemView';
import { StyledPrivateDataItem, StyledPrivateDataContent, StyledPrivateDataErrorIcon } from './styles';

export type PrivateDataErrorItemViewProps = {
  type: PrivateDataType;
  increasedFontSize?: boolean;
};

export const PrivateDataErrorItemView: FC<PrivateDataErrorItemViewProps> = ({ type, increasedFontSize = false }) => {
  return (
    <StyledPrivateDataItem data-automation="ContactData" isUnavailable>
      <SWReactIcons iconName={getIconName(type)} size="xs" className={type} />
      <StyledPrivateDataContent increasedFontSize={increasedFontSize} isUnavailable>
        {translate('contact_card.unavailable')}
      </StyledPrivateDataContent>
      <Tooltip content={translate('contact_card.unavailable_tooltip')} placement="left" minWidth={150}>
        <StyledPrivateDataErrorIcon>
          <SWReactIcons size="xs" iconName="warning" />
        </StyledPrivateDataErrorIcon>
      </Tooltip>
    </StyledPrivateDataItem>
  );
};
