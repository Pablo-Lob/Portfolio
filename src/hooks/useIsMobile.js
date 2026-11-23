import { useSyncExternalStore } from 'react';
import { readStorage, writeStorage, removeStorage } from '../utils/storage.js';

const MOBILE_QUERY = '(max-width: 767px), (pointer: coarse) and (max-width: 1023px)';
const VIEW_KEY = 'portfolio:view';

function resolveOverride() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('desktop') === '1') {
        writeStorage(localStorage, VIEW_KEY, 'desktop');
        return 'desktop';
    }
    if (params.get('mobile') === '1') {
        writeStorage(localStorage, VIEW_KEY, 'mobile');
        return 'mobile';
    }
    if (params.get('auto') === '1') {
        removeStorage(localStorage, VIEW_KEY);
        return null;
    }
    const stored = readStorage(localStorage, VIEW_KEY);
    return stored === 'desktop' || stored === 'mobile' ? stored : null;
}

const override = resolveOverride();
const mediaQuery = window.matchMedia(MOBILE_QUERY);

function subscribe(onChange) {
    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
}

function getSnapshot() {
    if (override) return override === 'mobile';
    return mediaQuery.matches;
}

export function useIsMobile() {
    return useSyncExternalStore(subscribe, getSnapshot);
}
