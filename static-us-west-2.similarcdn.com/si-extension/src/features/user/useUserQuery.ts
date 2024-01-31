import { useQuery } from 'react-query';
import mixpanel from 'mixpanel-browser';
import * as Sentry from '@sentry/browser';
import * as Fullstory from '../../services/fullstory';
import { User } from '../../domain/user';
import { HttpClient } from '../../services/HttpClient';
import { getBuildNumber, getExtensionVersion } from '../../services/browser';
import { useAppState } from '../../AppStateProvider';
import { matomoTracker } from '../../services/tracking/matomoTracker';
import { isVersionHigherOrEqual } from '../../services/checkVersion';

export const fetchUser = () => HttpClient.get<User>('/sales-extension/api/user/info');

export const useUserQuery = () => {
  const { isOpen, settingsStorage } = useAppState();

  return useQuery('user', fetchUser, {
    onSuccess: (user) => {
      const currentUiVersion = getBuildNumber();

      if (!settingsStorage.isCustomUiVersion && !!currentUiVersion) {
        if (isVersionHigherOrEqual(getExtensionVersion(), '1.4.2') && currentUiVersion !== user.uiVersion) {
          window.parent.postMessage({ message: 'set uiversion', uiVersion: user.uiVersion }, '*');
        } else {
          window.parent.postMessage({ message: 'set settings storage', key: 'uiVersion', value: user.uiVersion }, '*');
        }
      }

      if (user.isImpersonate) {
        mixpanel.disable();
        matomoTracker.disable();
        Sentry.close(0).catch(console.error);
        return;
      }

      if (user.isExtensionEnabled) {
        Fullstory.init();
        Fullstory.identify(user);
      }

      mixpanel.identify(`${user.userId}`);
      const userProperties = {
        email: user.email,
        user_id: user.userId,
        account_id: user.accountId,
        base_product: user.accountType,
      };
      mixpanel.register(userProperties);
      matomoTracker.setUserProperties(userProperties);
      Sentry.setTags({ ...userProperties, extension_version: getExtensionVersion() });
    },
    enabled: isOpen,
    onError: () => {
      mixpanel.reset();
    },
  });
};
