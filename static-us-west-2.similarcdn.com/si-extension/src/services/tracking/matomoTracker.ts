import { MatomoTracker } from '@similarweb/sw-track';
import { v4 as uuid } from 'uuid';
import { getMainDomain } from '../browser';
import { getCookies, setCookie } from '../cookies';

export const matomoTracker = new (class extends MatomoTracker {
  protected isEnabled(): boolean {
    return true;
  }

  protected paq(): (string | number)[][] {
    return window._matomoPaq ?? [];
  }

  protected shouldBuffer(): boolean {
    return false;
  }

  protected searchParams(): Record<string, string> {
    const searchParams = new URLSearchParams(window.location.search);
    const params: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      params[key] = value;
    });
    return params;
  }

  setUserProperties({ user_id, email, base_product }: { user_id: number; email: string; base_product: string }): void {
    this.paq().push(
      ['setCustomDimension', 12, user_id],
      ['setCustomVariable', 1, 'Email', email, 'page'],
      ['setCustomVariable', 3, 'ProductName', base_product, 'page']
    );
  }

  disable(): void {
    this.paq().push(['optUserOut']);
  }
})();

const getSgId = () => {
  const sgIdKey = 'sgID';
  const cookieExpirationInDays = 10000;

  let sgId = getCookies()[sgIdKey];
  if (!sgId) {
    sgId = uuid();
    setCookie({ name: sgIdKey, value: sgId, days: cookieExpirationInDays, domain: getMainDomain() });
  }

  return sgId;
};

export const initMatomoTracker = () => {
  const matomoSiteId = '1';
  const sgId = getSgId();

  const matomoInitScript = document.createElement('script');
  matomoInitScript.addEventListener('load', () => initializeMatomo());
  matomoInitScript.src = 'https://matomo.cloudfront.similarweb.io/sw-matomo-init.js';
  matomoInitScript.async = true;
  document.head.appendChild(matomoInitScript);

  function initializeMatomo() {
    const additionalParams = [['setCustomDimension', 11, sgId], ['disableCookies'], ['forgetUserOptOut']];
    window.initMatomo?.(matomoSiteId, additionalParams);
  }
};
