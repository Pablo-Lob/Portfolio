import { useState, useEffect } from 'react';
import { fileSystem } from '../data/fileSystem.js';

const STARTUP_DELAY = 800;
const TABLET_QUERY = '(max-width: 1023px)';

export function findApp(id) {
    return fileSystem.find(f => f.id === id);
}

export function useAppManager({ single = false, autostart = false } = {}) {
    const [apps, setApps] = useState([]);
    const [activeId, setActiveId] = useState(null);
    const [zOrder, setZOrder] = useState([]);

    useEffect(() => {
        if (!autostart) return;
        const t = setTimeout(() => {
            const maximized = window.matchMedia(TABLET_QUERY).matches;
            const startup = fileSystem.filter(f => f.isOpen);
            setApps(prev => {
                const next = startup
                    .filter(sw => !prev.find(pw => pw.id === sw.id))
                    .map(sw => ({ ...sw, isMaximized: maximized }));
                return [...prev, ...next];
            });
        }, STARTUP_DELAY);
        return () => clearTimeout(t);
    }, [autostart]);

    const focus = (id) => {
        setActiveId(id);
        setZOrder(prev => (prev[prev.length - 1] === id ? prev : [...prev.filter(i => i !== id), id]));
    };

    const close = (id) => {
        setApps(prev => prev.filter(w => w.id !== id));
        setZOrder(prev => prev.filter(i => i !== id));
        setActiveId(prev => (prev === id ? null : prev));
    };

    const toggleMinimize = id => setApps(prev => prev.map(w => (w.id === id ? { ...w, isMinimised: !w.isMinimised } : w)));
    const toggleMaximize = id => setApps(prev => prev.map(w => (w.id === id ? { ...w, isMaximized: !w.isMaximized } : w)));

    const open = (id) => {
        const file = findApp(id);
        if (!file) return;
        if (file.type === 'link') {
            window.open(file.url, '_blank', 'noopener,noreferrer');
            return;
        }
        const existing = apps.find(w => w.id === id);
        if (existing) {
            if (existing.isMinimised) toggleMinimize(id);
            focus(id);
            return;
        }
        const maximized = single || window.matchMedia(TABLET_QUERY).matches;
        const entry = { ...file, isMinimised: false, isMaximized: maximized };
        setApps(prev => (single ? [entry] : [...prev, entry]));
        focus(id);
    };

    const handleTaskbarClick = (id) => {
        const win = apps.find(w => w.id === id);
        if (!win) return;
        if (win.isMinimised) {
            toggleMinimize(id);
            focus(id);
        } else if (activeId === id) {
            toggleMinimize(id);
        } else {
            focus(id);
        }
    };

    return { apps, activeId, zOrder, open, close, focus, toggleMinimize, toggleMaximize, handleTaskbarClick };
}
