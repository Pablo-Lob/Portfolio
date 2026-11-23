import { useState, useEffect, useRef } from 'react';
import '../../styles/Mobile.css';
import { useAppManager, findApp } from '../../hooks/useAppManager.js';
import { useReducedMotion } from '../../hooks/useReducedMotion.js';
import { MOBILE_APP_IDS, MOBILE_DOCK_IDS } from '../apps/registry.js';
import { skills } from '../../data/skills.js';
import { pickLang } from '../../utils/lang.js';
import { BOOTED_KEY, readStorage, writeStorage } from '../../utils/storage.js';
import StatusBar from './StatusBar.jsx';
import ProfileWidget from './ProfileWidget.jsx';
import LockScreen from './LockScreen.jsx';
import AppScreen from './AppScreen.jsx';
import ContactSheet from './ContactSheet.jsx';
import { FaExternalLinkAlt } from 'react-icons/fa';

function iconCenter(element) {
    const rect = element.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
}

function AppIcon({ file, onOpen, variant }) {
    return (
        <button
            type="button"
            className={`m-app m-app-${variant}`}
            aria-label={`Open ${file.name}`}
            onClick={(e) => onOpen(file.id, iconCenter(e.currentTarget))}
        >
            <span className="m-app-icon">
                <img src={file.icon} alt="" draggable="false" />
                {file.type === 'link' && <span className="m-app-badge"><FaExternalLinkAlt size={8} /></span>}
            </span>
            {variant === 'grid' && <span className="m-app-name">{file.name}</span>}
        </button>
    );
}

function MobileShell() {
    const reducedMotion = useReducedMotion();
    const [locked, setLocked] = useState(() => !reducedMotion && !readStorage(sessionStorage, BOOTED_KEY));
    const [contactOpen, setContactOpen] = useState(false);
    const [origin, setOrigin] = useState({ x: window.innerWidth / 2, y: window.innerHeight });
    const [leaving, setLeaving] = useState(false);
    const manager = useAppManager({ single: true });
    const { apps, open, close } = manager;
    const current = apps[0] ?? null;

    const managerRef = useRef(manager);
    useEffect(() => {
        managerRef.current = manager;
    });

    useEffect(() => {
        if (window.history.state?.app || window.history.state?.sheet) {
            window.history.replaceState(null, '');
        }
        const onPopState = (e) => {
            const m = managerRef.current;
            const id = e.state?.app;
            if (id) {
                setLeaving(false);
                m.open(id);
            }
            else if (m.apps.length > 0) setLeaving(true);
        };
        window.addEventListener('popstate', onPopState);
        return () => window.removeEventListener('popstate', onPopState);
    }, []);

    const handleUnlock = () => {
        writeStorage(sessionStorage, BOOTED_KEY, '1');
        setLocked(false);
    };

    const openApp = (id, from) => {
        const file = findApp(id);
        if (!file) return;
        if (file.type === 'link') {
            open(id);
            return;
        }
        if (current?.id === id) return;
        if (from) setOrigin(from);
        setLeaving(false);
        window.history.pushState({ app: id }, '');
        open(id);
    };

    const goBack = () => window.history.back();

    const finishLeave = () => {
        if (current) close(current.id);
        setLeaving(false);
    };

    const gridApps = MOBILE_APP_IDS.map(findApp).filter(Boolean);
    const dockApps = MOBILE_DOCK_IDS.map(findApp).filter(Boolean);

    return (
        <div className="m-shell">
            <StatusBar />

            <main className="m-home">
                <ProfileWidget onContact={() => setContactOpen(true)} />

                <nav className="m-grid" aria-label="Applications">
                    {gridApps.map(file => (
                        <AppIcon key={file.id} file={file} variant="grid" onOpen={openApp} />
                    ))}
                </nav>

                <section className="m-skills" aria-label="Skills">
                    {skills.map(group => (
                        <div key={group.id} className="m-skills-group">
                            <h2 className="m-skills-title">{pickLang(group.category)}</h2>
                            <p className="m-skills-items">{pickLang(group.items).join(' · ')}</p>
                        </div>
                    ))}
                </section>
            </main>

            <footer className="m-dock">
                {dockApps.map(file => (
                    <AppIcon key={file.id} file={file} variant="dock" onOpen={openApp} />
                ))}
            </footer>

            {current && (
                <AppScreen
                    key={current.id}
                    file={current}
                    origin={origin}
                    leaving={leaving}
                    onBack={goBack}
                    onLeaveEnd={finishLeave}
                    onOpenApp={openApp}
                />
            )}

            {contactOpen && <ContactSheet onClose={() => setContactOpen(false)} />}
            {locked && <LockScreen onDone={handleUnlock} />}
        </div>
    );
}

export default MobileShell;
