import { RefObject, useEffect } from 'react';

export function useExpandOnMount(ref: RefObject<HTMLDivElement>, animatedMount: boolean) {
  useEffect(() => {
    const element = ref.current;
    if (!element || !animatedMount) return;

    const animation = element.animate(
      [
        { height: '0px', marginTop: '0px' },
        { height: `${element.scrollHeight}px`, marginTop: '12px' },
      ],
      { duration: 500, fill: 'forwards', easing: 'ease-in-out' }
    );

    animation.onfinish = () => {
      element.style.overflow = 'visible';
    };

    return () => animation.cancel();
  }, []);
}
