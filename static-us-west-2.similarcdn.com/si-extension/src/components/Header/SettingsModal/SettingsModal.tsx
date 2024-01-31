import React, { useState } from 'react';
import { getBuildNumber, getSandbox } from '../../../services/browser';
import { StyledField, StyledTextInput, StyledToggleField } from './styles';
import { Modal } from '../../Modal';
import { useAppState } from '../../../AppStateProvider';
import { Switch } from '../../Switch';
import { appStore } from '../../../services/appStore';

export type SettingsModalProps = {
  onClose(): void;
  isOpen: boolean;
};

const IS_EMAIL_GENERATION_ENABLED_KEY = 'isEmailGenerationEnabled';

export const SettingsModal = ({ onClose, isOpen }: SettingsModalProps) => {
  const { settingsStorage } = useAppState();
  const [uiVersion, setUiVersion] = useState(getBuildNumber);
  const [sandbox, setSandbox] = useState(getSandbox);
  const [isEmailGenerationEnabled, setIsEmailGenerationEnabled] = useState(
    settingsStorage.isEmailGenerationEnabled ?? false
  );

  const setSetting = (key: string, value: unknown) => {
    window.parent.postMessage({ message: 'set settings storage', key, value }, '*');
  };

  const onApplySettings = () => {
    if (uiVersion !== getBuildNumber()) setSetting('isCustomUiVersion', true);
    setSetting('uiVersion', uiVersion);
    window.parent.postMessage({ message: 'set sandbox', sandbox }, '*');
  };

  const onResetSettings = () => {
    setSetting('isCustomUiVersion', false);
    setSetting('uiVersion', null);
    window.parent.postMessage({ message: 'set sandbox', sandbox: 'production' }, '*');
  };

  const handleCloseFinish = () => {
    setUiVersion(getBuildNumber);
    setSandbox(getSandbox);
  };

  const handleEmailGenerationToggle = () => {
    setIsEmailGenerationEnabled((prev) => !prev);
    setSetting(IS_EMAIL_GENERATION_ENABLED_KEY, !isEmailGenerationEnabled);
    appStore.setSettingsStorageValue({ [IS_EMAIL_GENERATION_ENABLED_KEY]: !isEmailGenerationEnabled });
  };

  return (
    <Modal
      heading="Settings"
      onClose={onClose}
      cancelButtonProps={{
        'data-automation': 'CancelButton',
        onClick: onResetSettings as () => void,
        children: 'Reset',
        variant: 'flat',
      }}
      confirmButtonProps={{
        'data-automation': 'ConfirmButton',
        onClick: onApplySettings as () => void,
        children: 'Apply',
      }}
      isOpen={isOpen}
      onCloseFinish={handleCloseFinish}
    >
      <StyledField>
        <span>UI version</span>
        <StyledTextInput
          data-automation="UiVersion"
          type="text"
          value={uiVersion}
          onChange={(e) => setUiVersion(e.target.value)}
        />
      </StyledField>
      <StyledField>
        <span>Sandbox</span>
        <StyledTextInput
          data-automation="Sandbox"
          type="text"
          value={sandbox}
          onChange={(e) => setSandbox(e.target.value)}
        />
      </StyledField>
      <StyledToggleField>
        <Switch isSelected={isEmailGenerationEnabled} onClick={handleEmailGenerationToggle} />
        <span>isEmailGenerationEnabled</span>
      </StyledToggleField>
    </Modal>
  );
};
