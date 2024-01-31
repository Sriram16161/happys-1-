import { useEffect, useState } from 'react';

export const DATA_WAITING_TIME = 1000;

type UseHasTimedOutParams = { condition?: boolean; time?: number };

export const useHasTimedOut = ({ condition = true, time = DATA_WAITING_TIME }: UseHasTimedOutParams = {}) => {
  const [hasTimedOut, setHasTimedOut] = useState(!condition);
  let timeoutId: NodeJS.Timeout | null = null;

  useEffect(() => {
    if (condition) {
      timeoutId = setTimeout(() => setHasTimedOut(true), time);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  return hasTimedOut;
};
