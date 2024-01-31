import * as Sentry from '@sentry/browser';
import { getBuildNumber, isProductionEnv } from './browser';

export const initSentry = () => {
  const buildNumber = getBuildNumber();
  const isEnabled = isProductionEnv();

  Sentry.init({
    dsn: 'https://848bbcb06195e4973da026565724b856@o289771.ingest.sentry.io/4505843807813632',
    integrations: [
      new Sentry.Replay({
        maskAllText: false,
        maskAllInputs: false,
        networkDetailAllowUrls: [/^https:\/\/[^/]*\.similarweb\.com/],
      }),
    ],
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 1.0,
    enabled: isEnabled,
    release: `si-extension-client@${buildNumber}`,
  });
};
