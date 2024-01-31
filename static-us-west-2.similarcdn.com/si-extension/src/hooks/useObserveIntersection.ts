import { useEffect } from 'react';

export type UseObserveIntersectionProps = {
  observerRootId?: string;
  shouldObserve: boolean;
  sentinelSelector: string;
  onIntersection(entries: IntersectionObserverEntry[]): void;
  rootMargin?: string;
  threshold?: number[] | number;
};

export const useObserveIntersection = (props: UseObserveIntersectionProps) => {
  const { observerRootId, shouldObserve, sentinelSelector, onIntersection, rootMargin, threshold = 1 } = props;

  useEffect(() => {
    if (!shouldObserve) return;

    const observerRoot = observerRootId ? document.querySelector(`#${CSS.escape(observerRootId)}`) : undefined;
    const sentinelElement = (observerRoot || document).querySelector(sentinelSelector);

    if (!sentinelElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) onIntersection(entries);
      },
      { root: observerRoot, rootMargin, threshold }
    );

    observer.observe(sentinelElement);

    return () => observer.disconnect();
  }, [shouldObserve, sentinelSelector, observerRootId, onIntersection]);
};
