import { useState, useEffect, useRef } from 'react';
import '../../styles/Desktop.css';
import logo from '../../assets/images/kali_logo.png';
import profilePhoto from '../../assets/images/foto-profile.jpg';
import { fileSystem } from '../../data/fileSystem.js';
import DesktopIcon from './DesktopIcon.jsx';
import Window from './Window.jsx';
import { FaVolumeUp, FaPowerOff, FaLock, FaRedo, FaBell, FaCog, FaNetworkWired, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa';

const WIDGET_SKILLS = [
    { category: 'Frontend', color: '#3b8eea', items: [
        { name: 'HTML / CSS',              level: 82 },
        { name: 'React',                   level: 78 },
    ]},
    { category: 'Backend', color: '#2ecc71', items: [
        { name: 'Java',                    level: 90 },
        { name: 'Spring Boot',             level: 75 },
        { name: 'SQL',                     level: 65 },
    ]},
    { category: 'Herramientas', color: '#e67e22', items: [
        { name: 'Git / GitHub',            level: 85 },
        { name: 'Docker',                  level: 60 },
        { name: 'Figma',                   level: 70 },
        { name: 'Win / Ubuntu Server',     level: 50 },
    ]},
    { category: 'Seguridad', color: '#e74c3c', items: [
        { name: 'Cisco',                   level: 90 },
        { name: 'Kali Linux',              level: 70 },
    ]},
];

function Desktop({ onLock }) {
    // ── Skills animation ─────────────────────────────────────────────────────
    const [skillsAnimated, setSkillsAnimated] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setSkillsAnimated(true), 500);
        return () => clearTimeout(t);
    }, []);

    // ── Reloj ────────────────────────────────────────────────────────────────
    const [date, setDate] = useState(new Date());
    useEffect(() => {
        const t = setInterval(() => setDate(new Date()), 1000);
        return () => clearInterval(t);
    }, []);

    const hh = date.getHours().toString().padStart(2, '0');
    const mm = date.getMinutes().toString().padStart(2, '0');
    const timeString = `${hh}:${mm}`;

    // ── Ventanas ──────────────────────────────────────────────────────────────
    const [openWindows, setOpenWindows] = useState([]);

    // Abrir ventanas de arranque
    useEffect(() => {
        const t = setTimeout(() => {
            const startupWindows = fileSystem.filter(f => f.isOpen);
            setOpenWindows(prev => {
                const next = startupWindows.filter(sw => !prev.find(pw => pw.id === sw.id));
                return [...prev, ...next];
            });
        }, 800);
        return () => clearTimeout(t);
    }, []);

    // ── Foco de ventana (z-index) ─────────────────────────────────────────────
    const [activeWindowId, setActiveWindowId] = useState(null);
    const focusWindow = (id) => setActiveWindowId(id);

    const closeWindow    = id => {
        setOpenWindows(prev => prev.filter(w => w.id !== id));
        setActiveWindowId(prev => prev === id ? null : prev);
    };
    const toggleMinimize = id => setOpenWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimised: !w.isMinimised } : w));
    const toggleMaximize = id => setOpenWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized } : w));

    const openWindow = (fileId) => {
        const file = fileSystem.find(f => f.id === fileId);
        if (!file) return;
        const existing = openWindows.find(w => w.id === fileId);
        if (existing) {
            if (existing.isMinimised) toggleMinimize(fileId);
            focusWindow(fileId);
            return;
        }
        if (file.type === 'link') { window.open(file.url, '_blank'); return; }
        setOpenWindows(prev => [...prev, { ...file, isMinimised: false, isMaximized: false }]);
        focusWindow(fileId);
    };

    const handleTaskbarClick = (winId) => {
        const win = openWindows.find(w => w.id === winId);
        if (!win) return;
        if (win.isMinimised) {
            toggleMinimize(winId);
            focusWindow(winId);
        } else if (activeWindowId === winId) {
            toggleMinimize(winId);
        } else {
            focusWindow(winId);
        }
    };

    // ── Menú de aplicaciones ─────────────────────────────────────────────────
    const [showAppMenu, setShowAppMenu] = useState(false);
    const [appSearch, setAppSearch] = useState('');
    const appMenuRef = useRef(null);

    useEffect(() => {
        if (!showAppMenu) return;
        const close = e => { if (!appMenuRef.current?.contains(e.target)) setShowAppMenu(false); };
        document.addEventListener('mousedown', close);
        return () => document.removeEventListener('mousedown', close);
    }, [showAppMenu]);

    const handleAppMenuOpen = (id) => {
        openWindow(id);
        setShowAppMenu(false);
        setAppSearch('');
    };

    const menuApps = fileSystem.filter(f => f.type !== 'trash');
    const filteredApps = menuApps.filter(f =>
        f.name.toLowerCase().includes(appSearch.toLowerCase())
    );

    // ── Menú de apagado ───────────────────────────────────────────────────────
    const [showPowerMenu, setShowPowerMenu] = useState(false);
    const powerRef = useRef(null);

    useEffect(() => {
        if (!showPowerMenu) return;
        const close = e => { if (!powerRef.current?.contains(e.target)) setShowPowerMenu(false); };
        document.addEventListener('mousedown', close);
        return () => document.removeEventListener('mousedown', close);
    }, [showPowerMenu]);

    return (
        <div className="desktop-container">
            {/* ── Taskbar ─────────────────────────────────────────────────── */}
            <div className="taskbar">
                <div className="taskbar-left">
                    {/* ── App Menu (dragon button) ─────────────────────────── */}
                    <div className="app-menu-wrap" ref={appMenuRef}>
                        <img
                            className={`logo-kali${showAppMenu ? ' logo-kali-active' : ''}`}
                            src={logo}
                            alt="Logo kali"
                            onClick={() => { setShowAppMenu(v => !v); setAppSearch(''); }}
                        />
                        {showAppMenu && (
                            <div className="app-menu">
                                <div className="app-menu-search">
                                    <span className="app-menu-search-icon">⌕</span>
                                    <input
                                        className="app-menu-input"
                                        type="text"
                                        placeholder="Search applications..."
                                        value={appSearch}
                                        onChange={e => setAppSearch(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                                <div className="app-menu-list">
                                    {filteredApps.map(f => (
                                        <div
                                            key={f.id}
                                            className="app-menu-item"
                                            onClick={() => handleAppMenuOpen(f.id)}
                                        >
                                            <img src={f.icon} alt={f.name} className="app-menu-icon" />
                                            <span className="app-menu-name">{f.name}</span>
                                            {f.type === 'link' && <span className="app-menu-badge">↗</span>}
                                        </div>
                                    ))}
                                    {filteredApps.length === 0 && (
                                        <div className="app-menu-empty">No results for "{appSearch}"</div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="separator" />

                    <div className="terminal-icon" onClick={() => openWindow('terminal')} title="Open Terminal">
                        <span style={{ fontWeight: 'bold', fontSize: '14px' }}>_&gt;</span>
                    </div>
                    <div className="separator" />

                    <div className="workspaces">
                        <div className="workspace-btn active">1</div>
                        <div className="workspace-btn">2</div>
                        <div className="workspace-btn">3</div>
                        <div className="workspace-btn">4</div>
                    </div>
                    <div className="separator" />

                    <div className="taskbar-windows">
                        {openWindows.map(win => (
                            <div
                                key={win.id}
                                className={`taskbar-item ${!win.isMinimised && activeWindowId === win.id ? 'active' : win.isMinimised ? '' : 'open'}`}
                                onClick={() => handleTaskbarClick(win.id)}
                                title={win.name}
                            >
                                <img src={win.icon} alt="icon" />
                                <span>{win.name}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="taskbar-right">
                    {/* Tray icons */}
                    <div className="tray-icon" title="Network"><FaNetworkWired size={13} /></div>
                    <div className="tray-icon" title="Volume"><FaVolumeUp size={13} /></div>
                    <div className="tray-icon" title="Notifications"><FaBell size={13} /></div>
                    <div className="tray-icon" title="Settings"><FaCog size={13} /></div>
                    <div className="clock">{timeString}</div>
                    <div className="separator" />
                    <div className="tray-icon" title="Lock screen" onClick={onLock}><FaLock size={12} /></div>

                    {/* Power menu */}
                    <div className="power-wrap" ref={powerRef}>
                        <div
                            className="tray-icon"
                            title="Session / Power"
                            onClick={() => setShowPowerMenu(v => !v)}
                        >
                            <FaPowerOff size={13} />
                        </div>
                        {showPowerMenu && (
                            <div className="power-menu">
                                <div className="power-menu-item" onClick={onLock}>
                                    <FaLock size={11} /> Lock Screen
                                </div>
                                <div className="power-menu-item power-menu-danger" onClick={() => window.location.reload()}>
                                    <FaRedo size={11} /> Restart
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Desktop ─────────────────────────────────────────────────── */}
            <div className="desktop-content">
                {fileSystem.map(file => (
                    <DesktopIcon key={file.id} file={file} onOpen={openWindow} />
                ))}

                {/* ── Widgets column ──────────────────────────────────────── */}
                <div className="widgets-column">
                    <div className="widget-about">
                        <img src={profilePhoto} alt="Juan Pablo" className="widget-avatar" />
                        <div className="widget-name">Juan Pablo Lobato</div>
                        <div className="widget-role">Full-Stack Developer</div>
                        <div className="widget-location">📍 España</div>
                        <div className="widget-badge">● Open to work</div>
                        <div className="widget-contacts">
                            <a href="mailto:juanpablolobato1@gmail.com" title="Email"><FaEnvelope size={14} /></a>
                            <a href="https://github.com/Pablo-Lob" target="_blank" rel="noreferrer" title="GitHub"><FaGithub size={14} /></a>
                            <a href="https://www.linkedin.com/in/pablo-lobato-gonz%C3%A1lez-536b67221" target="_blank" rel="noreferrer" title="LinkedIn"><FaLinkedin size={14} /></a>
                        </div>
                    </div>

                    <div className="widget-skills">
                        {WIDGET_SKILLS.map(group => (
                            <div key={group.category} className="ws-group">
                                <div className="ws-group-title" style={{ color: group.color }}>▸ {group.category}</div>
                                {group.items.map(s => (
                                    <div key={s.name} className="ws-bar-row">
                                        <div className="ws-skill-label">
                                            <span className="ws-skill-name">{s.name}</span>
                                            <span className="ws-skill-pct" style={{ color: group.color }}>{s.level}%</span>
                                        </div>
                                        <div className="ws-bar-track">
                                            <div className="ws-bar-fill" style={{
                                                width: skillsAnimated ? `${s.level}%` : '0%',
                                                background: group.color,
                                            }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>

                {openWindows.map(win => (
                    <Window
                        key={win.id}
                        file={win}
                        onClose={closeWindow}
                        onMinimize={toggleMinimize}
                        onMaximize={toggleMaximize}
                        onOpenWindow={openWindow}
                        onFocus={focusWindow}
                        isActive={activeWindowId === win.id}
                    />
                ))}
            </div>
        </div>
    );
}

export default Desktop;
