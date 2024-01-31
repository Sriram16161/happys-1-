import { Persona } from '../../../domain/persona';
import { allTrackers } from '../../../services/tracking/tracking';

export const usePersonaFilterTracking = (personas: Persona[] | undefined) => {
  const handleTracking = (action: string, eventName: string) => {
    allTrackers.dispatchTrackEvent('contacts options', action, `${eventName}/${personas?.length ?? 0}`);
  };

  const handleTrackOnOpen = () => handleTracking('open employee profile DD', 'expand filter/employee profile');

  const handleTrackOnCreate = () => handleTracking('create new', `create employee profile/${personas?.length ?? 0}`);

  const handleTrackOnEdit = (persona: Persona) =>
    handleTracking('edit profile', `edit employee profile/${persona.name}`);

  const handleTrackOnPersonaSelect = (persona: Persona) =>
    handleTracking('select profile', `profile type/${persona.name}`);

  return {
    handleTrackOnOpen,
    handleTrackOnCreate,
    handleTrackOnEdit,
    handleTrackOnPersonaSelect,
  };
};
