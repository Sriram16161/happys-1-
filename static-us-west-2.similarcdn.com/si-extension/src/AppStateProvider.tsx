import React, { useSyncExternalStore } from 'react';
import { AppState, AppStore, initialState } from './services/appStore';

const AppStateContext = React.createContext<AppState>(initialState);

export const useAppState = () => React.useContext(AppStateContext);

export const AppStateProvider = ({ children, appStore }: { children: React.ReactNode; appStore: AppStore }) => {
  const appState = useSyncExternalStore(appStore.subscribe, appStore.getState);
  return <AppStateContext.Provider value={appState}>{children}</AppStateContext.Provider>;
};
