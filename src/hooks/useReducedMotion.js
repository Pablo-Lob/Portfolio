import { useSyncExternalStore } from 'react';

const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

function subscribe(onChange) {
    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
}

export function useReducedMotion() {
    return useSyncExternalStore(subscribe, () => mediaQuery.matches);
}
