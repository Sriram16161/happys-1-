import React, { Suspense } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { createGlobalStyle } from 'styled-components';
import { AppStateProvider, useAppState } from './AppStateProvider';
import { ToastProvider } from './components/ToastProvider';
import { AuthGuard } from './components/Guard/AuthGuard';
import { ImpersonateBadge } from './components/ImpersonateBadge';
import { AppStore } from './services/appStore';
import { UseCaseContainer, UseCaseProvider } from './UseCaseProvider';
import { CountriesLoadingGuard } from './components/CountriesLoadingGuard';
import { routingConfig } from './routingConfig';
import { usePageViewTracking } from './hooks/usePageViewTracking';
import { RestrictedAccessGuard } from './components/Guard/RestrictedAccessGuard';
import { StyledExtensionContainer } from './pages/styles';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    overflow: hidden;
  }

  * {
    box-sizing: border-box;
  }
`;

export type AppProps = { queryClient: QueryClient; appStore: AppStore; useCases: UseCaseContainer };

const Router = () => {
  const { page } = useAppState();
  const PageView = routingConfig.find((config) => config.page === page)?.component;

  usePageViewTracking();

  return <StyledExtensionContainer>{PageView && <PageView />}</StyledExtensionContainer>;
};

export const App = ({ queryClient, appStore, useCases }: AppProps) => {
  return (
    <>
      <Suspense fallback={<h1>Loading...</h1>}>
        <QueryClientProvider client={queryClient}>
          <AppStateProvider appStore={appStore}>
            <UseCaseProvider useCases={useCases}>
              <AuthGuard>
                <RestrictedAccessGuard>
                  <CountriesLoadingGuard>
                    <Router />
                    <ToastProvider />
                    <ImpersonateBadge />
                  </CountriesLoadingGuard>
                </RestrictedAccessGuard>
              </AuthGuard>
            </UseCaseProvider>
          </AppStateProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Suspense>
      <GlobalStyle />
    </>
  );
};
