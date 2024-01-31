import { useEffect, useRef } from 'react';

type Timer = ReturnType<typeof setTimeout>;
type Func = (...args: any[]) => void;

export const useDebounce = <F extends Func>(fn: F, delay: number) => {
  const timer = useRef<Timer>();

  useEffect(() => {
    return () => {
      if (!timer.current) return;
      clearTimeout(timer.current);
    };
  }, []);

  const debouncedFunction = ((...args: Parameters<F>) => {
    const newTimer = setTimeout(() => {
      fn(...args);
    }, delay);
    clearTimeout(timer.current);
    timer.current = newTimer;
  }) as F;

  return debouncedFunction;
};
