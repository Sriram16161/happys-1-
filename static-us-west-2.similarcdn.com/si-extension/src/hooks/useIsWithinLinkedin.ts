import { useAppState } from '../AppStateProvider';

export const useIsWithinLinkedin = () => {
  const { companyLinkedinId, contactLinkedinId } = useAppState();
  return !!companyLinkedinId || !!contactLinkedinId;
};
