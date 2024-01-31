import { EventData } from '../../messageHandler';
import { linkedinLikeUrlRoot, linkedinUrlRoot } from '../UrlService';
import config from './config.json';

export const postConfig = () => {
  const enrichedConfig = config
    .map((page) => ({ ...page, url: page.url.replace(linkedinUrlRoot, linkedinLikeUrlRoot) }))
    .concat(config);

  window.parent.postMessage({ message: 'post config', config: enrichedConfig }, '*');
};

export const initMessaging = () => {
  let queue: EventData[] = [];
  let messageHandler: ((event: EventData) => void) | null = null;

  window.addEventListener('message', (event: MessageEvent<EventData>) => {
    if (messageHandler) messageHandler(event.data);
    else queue.push(event.data);
  });

  return {
    registerHandler: (handler: (event: EventData) => void) => {
      messageHandler = handler;
      queue.forEach((event) => handler(event));
      queue = [];
    },
  };
};
