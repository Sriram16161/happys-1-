import React, { FC } from 'react';
import { allTrackers } from '../../services/tracking/tracking';
import { StyledCloseButton } from './styles';

export const CloseExtensionButton: FC = () => {
  const handleClickOnClose = () => {
    allTrackers.dispatchTrackEvent('extension top actions', 'collapse', 'close extension/minimise icon');
    window.parent.postMessage({ message: 'close' }, '*');
  };

  return <StyledCloseButton data-automation="CloseExtensionButton" onClick={handleClickOnClose} />;
};
