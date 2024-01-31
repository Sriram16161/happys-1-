import { AggregatedTracker, ConsoleTracker, ITrack } from '@similarweb/sw-track';
import { mixpanelTracker, initMixpanelTracker } from './mixpanelTracker';
import { initMatomoTracker, matomoTracker } from './matomoTracker';

export const allTrackers = new AggregatedTracker([
  mixpanelTracker as ITrack,
  matomoTracker as ITrack,
  new ConsoleTracker('allTrackers') as unknown as ITrack,
]);

export const initTracking = () => {
  initMixpanelTracker();
  initMatomoTracker();
};
