/* eslint-disable @typescript-eslint/no-explicit-any */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import I18NextLocizeBackend from 'i18next-locize-backend';

const fallbackLocale = 'en';

const appName = 'similarweb_si_extens';

export const initI18n = (i18nURL: string) => {
  const path = `${i18nURL}/i18n/`;
  const env = i18nURL.includes('sandbox') ? 'staging' : 'production';

  return i18n
    .use(initReactI18next)
    .use(I18NextLocizeBackend)
    .init({
      ns: ['translation'],
      load: 'currentOnly',
      lowerCaseLng: true,
      preload: [fallbackLocale],
      debug: false,
      fallbackLng: fallbackLocale,
      fallbackNS: 'translation',
      returnEmptyString: false,
      parseMissingKeyHandler: (key, def) => def ?? ``,
      backend: {
        loadPath: `${path}{{projectId}}/{{version}}/{{lng}}/{{ns}}`,
        privatePath: `${path}private/{{projectId}}/{{version}}/{{lng}}/{{ns}}`,
        addPath: `${path}missing/{{projectId}}/{{version}}/{{lng}}/{{ns}}`,
        updatePath: `${path}update/{{projectId}}/{{version}}/{{lng}}/{{ns}}`,
        projectId: appName,
        referenceLng: fallbackLocale,
        version: env,
      },
      react: { useSuspense: true },
      interpolation: { escapeValue: false },
    });
};

export type TranslateOptions = Omit<Parameters<typeof i18n.t>[1], 'defaultValue'> & {
  defaultValue?: any;
} & Record<string, any>;

export const translate = (key: string, options: TranslateOptions = { defaultValue: key }) => i18n.t(key, options);
