import { useSyncExternalStore } from 'react';

export const RESUME_PATH = '/?view=resume';

const listeners = new Set();

function subscribe(onChange) {
    listeners.add(onChange);
    window.addEventListener('popstate', onChange);
    window.addEventListener('hashchange', onChange);
    return () => {
        listeners.delete(onChange);
        window.removeEventListener('popstate', onChange);
        window.removeEventListener('hashchange', onChange);
    };
}

function notify() {
    listeners.forEach(listener => listener());
}

function isResumeLocation() {
    const params = new URLSearchParams(window.location.search);
    return params.get('view') === 'resume' || window.location.hash === '#resume';
}

export function navigateTo(url) {
    window.history.pushState(null, '', url);
    notify();
}

export function replaceUrl(url) {
    window.history.replaceState(null, '', url);
}

export function openResume() {
    navigateTo(RESUME_PATH);
}

export function closeResume() {
    navigateTo('/');
}

export function useResumeRoute() {
    return useSyncExternalStore(subscribe, isResumeLocation);
}
