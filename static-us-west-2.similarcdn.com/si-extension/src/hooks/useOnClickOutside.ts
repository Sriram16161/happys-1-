import { RefObject, useEffect } from 'react';

export const useOnClickOutside = <T extends HTMLElement>(
  containerRef: RefObject<T>,
  handler: (event: MouseEvent | KeyboardEvent) => void,
  shouldListen = true
) => {
  useEffect(() => {
    if (!shouldListen) return;

    const clickListener = (event: MouseEvent) => {
      const isWithinDom = document.contains(event.target as Node);
      const isWithinContainer = containerRef.current?.contains(event.target as Node);

      if (!isWithinDom || isWithinContainer) return;
      handler(event);
    };

    const keydownListener = (event: KeyboardEvent) => {
      if (event.key === 'Escape') handler(event);
    };

    const timeout = setTimeout(() => {
      document.addEventListener('click', clickListener, { capture: true });
      document.addEventListener('keydown', keydownListener);
    });

    return () => {
      clearTimeout(timeout);
      document.removeEventListener('click', clickListener, { capture: true });
      document.removeEventListener('keydown', keydownListener);
    };
  }, [containerRef, handler, shouldListen]);
};
