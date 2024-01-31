type EventData = { message: 'copied'; text: string } | { message: 'copy error'; text: string; error: string };

export const copyText = (text: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const listener = (event: MessageEvent<EventData>) => {
      if (event.data.message === 'copied' && event.data.text === text) {
        window.removeEventListener('message', listener);
        resolve();
      }

      if (event.data.message === 'copy error' && event.data.text === text) {
        window.removeEventListener('message', listener);
        reject(event.data.error);
      }
    };

    window.addEventListener('message', listener);

    window.parent.postMessage({ message: 'copy', text }, '*');
  });
};

export const getSandbox = () => new URLSearchParams(window.location.search).get('sandbox') || '';

export const getExtensionVersion = () => new URLSearchParams(window.location.search).get('version') || '';

export const getBuildNumber = () => {
  const buildNumberRegExp = /(\d+\.\d+\.[a-f0-9]+)/;
  return window.assetsRoot.match(buildNumberRegExp)?.[0] || '';
};

export const isProductionEnv = () => {
  const isProduction = getSandbox() === 'production';
  const buildNumber = getBuildNumber();

  return isProduction && !!buildNumber;
};

export const getMainDomain = () => {
  const { hostname } = new URL(window.location.href);
  const parts = hostname.split('.');
  return parts.slice(-2).join('.');
};
