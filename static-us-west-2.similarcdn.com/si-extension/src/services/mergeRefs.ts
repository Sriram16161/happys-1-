import { MutableRefObject, Ref, RefCallback } from 'react';

export function mergeRefs<T = unknown>(...refs: Ref<T>[]): RefCallback<T> {
  return (value: T) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(value);
      } else if (ref != null) {
        (ref as MutableRefObject<T>).current = value;
      }
    });
  };
}
