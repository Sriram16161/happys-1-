import React, { FC, ReactNode } from 'react';
import { IconName, SWReactIcons } from '@similarweb/icons';
import { PrivateDataType } from '../../../../../domain/contact';
import { appStore } from '../../../../../services/appStore';
import { copyText } from '../../../../../services/browser';
import { Tooltip } from '../../../../../components/Tooltip';
import { translate } from '../../../../../services/i18n';
import { StyledPrivateDataItem, StyledPrivateDataContent, StyledPrivateDataCopyButton } from './styles';

export type PrivateDataItemViewProps = {
  content: ReactNode;
  type: PrivateDataType;
  increasedFontSize?: boolean;
  onCopyClick: (type: PrivateDataType) => void;
};

export const getIconName = (type: PrivateDataType): IconName => {
  const typeToIconMap: Record<PrivateDataType, IconName> = {
    email: 'email',
    'direct-phone': 'phone',
    'mobile-phone': 'mobile-ios',
  };

  return typeToIconMap[type];
};

export const PrivateDataItemView: FC<PrivateDataItemViewProps> = ({
  onCopyClick,
  content,
  type,
  increasedFontSize = false,
}) => {
  const handleCopyClick = () => {
    copyText(content as string)
      .then(() => {
        const translationKey = {
          email: 'contact_card.email_copied',
          'direct-phone': 'contact_card.direct_phone_copied',
          'mobile-phone': 'contact_card.mobile_phone_copied',
        }[type];
        appStore.setToast({ content: translate(translationKey), icon: 'checked' });
      })
      .catch((err) => console.error("Couldn't copy to clipboard", err));
    onCopyClick(type);
  };

  return (
    <StyledPrivateDataItem data-automation="ContactData">
      <SWReactIcons iconName={getIconName(type)} size="xs" className={type} />
      <StyledPrivateDataContent increasedFontSize={increasedFontSize}>{content}</StyledPrivateDataContent>
      <Tooltip content={translate('common.copy')} placement="left">
        <StyledPrivateDataCopyButton onClick={handleCopyClick}>
          <SWReactIcons iconName="copy-rounded" size="xs" />
        </StyledPrivateDataCopyButton>
      </Tooltip>
    </StyledPrivateDataItem>
  );
};
