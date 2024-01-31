import React, { FC, useRef } from 'react';
import { PrivateData, PrivateDataType } from '../../../../domain/contact';
import { StyledPrivateData } from './styles';
import { PrivateDataErrorItemView, PrivateDataItemView } from './PrivateDataItemView';
import { useExpandOnMount } from './useExpandOnMount';

export type PrivateDataViewProps = {
  privateData: PrivateData;
  animatedMount?: boolean;
  increasedFontSize?: boolean;
  onCopyClick: (type: PrivateDataType) => void;
};

export const PrivateDataView: FC<PrivateDataViewProps> = (props) => {
  const { privateData, animatedMount = false, increasedFontSize = false, onCopyClick } = props;
  const hasEmailError = privateData.revealErrors?.hasValidEmailsError;
  const hasDirectPhoneError = privateData.revealErrors?.hasDirectPhoneNumbersError;
  const hasMobileError = privateData.revealErrors?.hasMobilePhoneNumbersError;
  const mobilePhones = privateData.phoneNumbers?.filter((phoneNumber) => phoneNumber.internalType === 'mobile') || [];
  const directPhones = privateData.phoneNumbers?.filter((phoneNumber) => phoneNumber.internalType === 'direct') || [];
  const ref = useRef<HTMLDivElement>(null);

  useExpandOnMount(ref, animatedMount);

  return (
    <StyledPrivateData data-automation="PrivateData" ref={ref} animatedMount={animatedMount}>
      {hasEmailError ? (
        <PrivateDataErrorItemView type="email" increasedFontSize={increasedFontSize} />
      ) : (
        privateData.emails?.map((email, i) => (
          <PrivateDataItemView
            onCopyClick={onCopyClick}
            content={email}
            type="email"
            key={i}
            increasedFontSize={increasedFontSize}
          />
        ))
      )}
      {hasDirectPhoneError ? (
        <PrivateDataErrorItemView type="direct-phone" increasedFontSize={increasedFontSize} />
      ) : (
        directPhones.map((phoneNumber, i) => (
          <PrivateDataItemView
            onCopyClick={onCopyClick}
            content={phoneNumber.number}
            type={`${phoneNumber.internalType}-phone`}
            key={i}
            increasedFontSize={increasedFontSize}
          />
        ))
      )}
      {hasMobileError ? (
        <PrivateDataErrorItemView type="mobile-phone" increasedFontSize={increasedFontSize} />
      ) : (
        mobilePhones.map((phoneNumber, i) => (
          <PrivateDataItemView
            onCopyClick={onCopyClick}
            content={phoneNumber.number}
            type={`${phoneNumber.internalType}-phone`}
            key={i}
            increasedFontSize={increasedFontSize}
          />
        ))
      )}
    </StyledPrivateData>
  );
};
