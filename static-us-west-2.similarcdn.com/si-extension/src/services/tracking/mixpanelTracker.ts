import mixpanel, { OverridedMixpanel } from 'mixpanel-browser';
import { CustomAttribute, ICustomDimensionData, MixpanelTracker, Primitive, TrackingEvent } from '@similarweb/sw-track';
import { getSandbox } from '../browser';

export const mixpanelTracker = new (class extends MixpanelTracker {
  private queue: { callback: (...args: any[]) => void; args: any[] }[] = []; // eslint-disable-line @typescript-eslint/no-explicit-any
  private isLoaded = false;

  protected mixpanel(): OverridedMixpanel {
    return mixpanel; // eslint-disable-line @typescript-eslint/no-unsafe-return
  }

  protected isEnabled(): boolean {
    return true;
  }

  public dispatchTrackEvent(
    event: TrackingEvent,
    action: string,
    eventName: string,
    customAttributes?: Record<CustomAttribute, Primitive>
  ): void {
    if (this.isLoaded) {
      super.dispatchTrackEvent(event, action, eventName, customAttributes);
    } else {
      this.queue.push({ callback: super.dispatchTrackEvent, args: [event, action, eventName, customAttributes] });
    }
  }

  public trackPageView(customDimsData: ICustomDimensionData): void {
    if (this.isLoaded) {
      super.trackPageView(customDimsData);
    } else {
      this.queue.push({ callback: super.trackPageView, args: [customDimsData] });
    }
  }

  public load(): void {
    this.isLoaded = true;
    this.queue.forEach(({ callback, args }) => {
      callback.apply(this, args);
    });
  }
})();

const getProjectToken = () => {
  const STAGING_PROJECT_TOKEN = '2a36d6f836516f4677bde7726425a84d';
  const PRODUCTION_PROJECT_TOKEN = '7ccb86f5c2939026a4b5de83b5971ed9';

  return getSandbox() === 'production' ? PRODUCTION_PROJECT_TOKEN : STAGING_PROJECT_TOKEN;
};

export const initMixpanelTracker = () => {
  mixpanel.init(getProjectToken(), {
    loaded: () => mixpanelTracker.load(),
    ignore_dnt: true,
    api_host: 'https://mpps.similarweb.com',
    api_method: 'GET',
    batch_requests: false,
    debug: false,
  });
};
