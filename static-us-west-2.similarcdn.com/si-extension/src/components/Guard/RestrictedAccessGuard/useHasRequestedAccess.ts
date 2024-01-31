import { useState } from 'react';
import { useUserQuery } from '../../../features/user/useUserQuery';
import { appStore } from '../../../services/appStore';

export const useHasRequestedAccess = () => {
  const userQuery = useUserQuery();
  const key = `hasRequestedAccess-${userQuery.data?.userId ?? ''}`;

  const getInitialValue = () => (appStore.getSettingsStorageValue(key) ?? false) as boolean;

  const [value, setValue] = useState(getInitialValue());

  const setHasRequestedAccess = (value: boolean) => {
    setValue(value);
    window.parent.postMessage({ message: 'set settings storage', key, value: true }, '*');
    appStore.setSettingsStorageValue({ [key]: true });
  };

  return { hasRequestedAccess: value, setHasRequestedAccess };
};
